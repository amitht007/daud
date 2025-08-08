"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function GitlabServicesPage() {
  const [form, setForm] = useState({
    email: "",
    group: "",
    groupId: "",
    description: "",
    projectName: "",
    maintainers: [],
    developers: [],
    techStack: "",
    tags: [],
  });
  const [groupQuery, setGroupQuery] = useState("");
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch group suggestions from GitLab API
  async function fetchGroups(query) {
    setLoadingGroups(true);
    setError("");
    try {
      const res = await fetch("/api/gitlab/groups?search=" + encodeURIComponent(query));
      if (!res.ok) throw new Error("Failed to fetch groups");
      const data = await res.json();
      setGroupSuggestions(data.groups || []);
    } catch (err) {
      setError("Could not fetch group suggestions.");
      setGroupSuggestions([]);
    }
    setLoadingGroups(false);
  }

  // Handle group input change and autosuggest
  function handleGroupInput(e) {
    const value = e.target.value;
    setForm(f => ({ ...f, group: value, groupId: "" }));
    setGroupQuery(value);
    if (value.length > 1) {
      fetchGroups(value);
    } else {
      setGroupSuggestions([]);
    }
  }

  // Handle group selection from suggestions
  function selectGroup(group) {
    setForm(f => ({ ...f, group: group.full_path, groupId: group.id }));
    setGroupSuggestions([]);
  }

  // Tag input for maintainers/developers with email autosuggest
  function TagInput({ label, value, onChange, excludeList = [] }) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    // Fetch email suggestions as user types
    async function fetchEmailSuggestions(query) {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`/api/emails?search=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch emails");
        const data = await res.json();
        setSuggestions((data.emails || []).filter(email => !value.includes(email) && !excludeList.includes(email)));
      } catch {
        setSuggestions([]);
      }
    }

    const handleInputChange = (e) => {
      setInput(e.target.value);
      fetchEmailSuggestions(e.target.value);
      setShowSuggestions(true);
    };

    const handleKeyDown = (e) => {
      if ((e.key === "Enter" || e.key === ",") && input.trim()) {
        e.preventDefault();
        const email = input.trim();
        if (value.includes(email) || excludeList.includes(email)) return;
        onChange([...value, email]);
        setInput("");
        setSuggestions([]);
        setShowSuggestions(false);
      }
      if (e.key === "Backspace" && !input && value.length) {
        onChange(value.slice(0, -1));
      }
    };

    const handleSuggestionClick = (email) => {
      if (value.includes(email) || excludeList.includes(email)) return;
      onChange([...value, email]);
      setInput("");
      setSuggestions([]);
      setShowSuggestions(false);
      if (inputRef.current) inputRef.current.focus();
    };

    return (
      <div className="relative">
        <label className="block text-slate-300 mb-1">{label}</label>
        <div className="flex flex-wrap gap-1 bg-slate-900 border border-slate-700 rounded px-2 py-1">
          {value.map((email, idx) => (
            <span key={email} className="bg-blue-700 text-white px-2 py-0.5 rounded text-xs flex items-center">
              {email}
              <button type="button" className="ml-1 text-xs" onClick={() => onChange(value.filter((v) => v !== email))}>&times;</button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="bg-transparent outline-none text-slate-100 flex-1 min-w-[100px]"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Add email and press Enter"
            onFocus={() => input && setShowSuggestions(true)}
            autoComplete="off"
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-slate-800 border border-slate-700 rounded mt-1 max-h-40 overflow-y-auto">
            {suggestions.map((email) => (
              <li
                key={email}
                className="px-3 py-2 cursor-pointer hover:bg-blue-800 text-slate-100"
                onClick={() => handleSuggestionClick(email)}
              >
                {email}
              </li>
            ))}
          </ul>
        )}
        {excludeList.length > 0 && <div className="text-xs text-slate-400 mt-1">Cannot add emails already in the other list.</div>}
      </div>
    );
  }

  // Handlers for maintainers/developers
  const handleMaintainersChange = (list) => setForm(f => ({ ...f, maintainers: list }));
  const handleDevelopersChange = (list) => setForm(f => ({ ...f, developers: list }));

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      console.log("[GitlabServicesPage] handleSubmit called with form:", form);
      // Save request to DB via API
      const res = await fetch("/api/gitlab/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          group: form.group,
          groupId: form.groupId,
          description: form.description,
          projectName: form.projectName,
          maintainers: form.maintainers,
          developers: form.developers,
          techStack: form.techStack,
          tags: form.tags,
        })
      });
      console.log("[GitlabServicesPage] API response:", res);
      if (!res.ok) throw new Error("Failed to submit request");
      setSuccess("Request submitted! Awaiting admin approval.");
      setForm({ email: "", group: "", groupId: "", description: "", projectName: "", maintainers: [], developers: [], techStack: "", tags: [] });
    } catch (err) {
      setError("Could not submit request. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl bg-slate-800 border border-slate-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-400 text-2xl">Request a New GitLab Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="mt-1 bg-slate-900 border-slate-700 text-slate-100"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="group" className="text-slate-200">GitLab Group or Subgroup</Label>
              <Input
                id="group"
                type="text"
                required
                autoComplete="off"
                value={form.group}
                onChange={handleGroupInput}
                className="mt-1 bg-slate-900 border-slate-700 text-slate-100"
                placeholder="Search for group..."
              />
              {loadingGroups && <div className="text-xs text-blue-300 mt-1">Searching...</div>}
              {groupSuggestions.length > 0 && (
                <ul className="bg-slate-700 rounded mt-1 max-h-40 overflow-y-auto border border-slate-600">
                  {groupSuggestions.map((g) => (
                    <li
                      key={g.id}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-800 text-slate-100"
                      onClick={() => selectGroup(g)}
                    >
                      {g.full_path}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <Label htmlFor="projectName" className="text-slate-200">Project Name</Label>
              <Input
                id="projectName"
                type="text"
                required
                value={form.projectName}
                onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))}
                className="mt-1 bg-slate-900 border-slate-700 text-slate-100"
                placeholder="Name of the new project"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-slate-200">Description</Label>
              <textarea
                id="description"
                required
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="mt-1 w-full rounded-md bg-slate-900 border border-slate-700 text-slate-100 p-2 min-h-[80px]"
                placeholder="Describe the project and its purpose"
              />
            </div>
            <div>
              <TagInput
                label="Maintainers"
                value={form.maintainers}
                onChange={handleMaintainersChange}
                excludeList={form.developers}
              />
            </div>
            <div>
              <TagInput
                label="Developers"
                value={form.developers}
                onChange={handleDevelopersChange}
                excludeList={form.maintainers}
              />
            </div>
            <div>
              <Label htmlFor="techStack" className="text-slate-200">Tech Stack</Label>
              <Input
                id="techStack"
                type="text"
                value={form.techStack}
                onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))}
                className="mt-1 bg-slate-900 border-slate-700 text-slate-100"
                placeholder="e.g. React, Node.js, Python"
              />
            </div>
            <div>
              <TagInput
                label="Tags (e.g. frontend, backend, rnd)"
                value={form.tags}
                onChange={tags => setForm(f => ({ ...f, tags }))}
                excludeList={[]}
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-green-400 text-sm">{success}</div>}
            <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700">
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ---
// Backend API endpoints you need to implement:
//
// 1. /api/gitlab/groups?search=...  (GET)
//    - Calls GitLab API (gitlab.txninfra.com) with the access token from .env.locale
//    - Returns group suggestions for autosuggest
//
// 2. /api/gitlab/project-request  (POST)
//    - Saves the request to your DB (for admin approval)
//    - Should include email, group, groupId, description, projectName
//
// 3. On admin approval (in approvals page), call your backend endpoint to create the project in GitLab using the access token.
//
// See the comments above for integration points.
