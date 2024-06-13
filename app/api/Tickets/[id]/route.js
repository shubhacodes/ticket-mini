import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

// grab the params we're passing in
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Find and delete the ticket
    const result = await Ticket.findByIdAndDelete(id);

    if (result) {
      return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
