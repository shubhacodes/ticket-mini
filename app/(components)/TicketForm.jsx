"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const router = useRouter();
  const EDITMODE = ticket && ticket._id !== "new";

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };
  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  // This is a state managed form - so state is changing constantly.
  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title: event.target.title.value,
      description: event.target.description.value,
      category: event.target.category.value,
      priority: event.target.priority.value,
      progress: event.target.progress.value,
      status: event.target.status.value,
      active: event.target.active.checked,
    };

    try {
      const response = await fetch("/api/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Ticket Created:", result);
        router.push("/");
      } else {
        throw new Error(result.message || "Failed to create ticket");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/2"
        method="post"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create your ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={5}
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          {[1, 2, 3, 4, 5].map((priority) => (
            <div key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority == priority}
              />
              <label>{priority}</label>
            </div>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <label>
          Active
          <input
            type="checkbox"
            name="active"
            onChange={handleChange}
            checked={formData.active}
          />
        </label>

        <input
          type="submit"
          className="btn"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;

/*
const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = {
    title: event.target.title.value,
    description: event.target.description.value,
    category: event.target.category.value,
    priority: event.target.priority.value,
    progress: event.target.progress.value,
    status: event.target.status.value,
    active: event.target.active.checked,
  };

  try {
    const response = await fetch('/api/Tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Ticket Created:', result);
    } else {
      throw new Error(result.message || 'Failed to create ticket');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
*/
