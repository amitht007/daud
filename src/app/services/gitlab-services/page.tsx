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
  function TagInput({ label, value, onChange, excludeList = [], suggestionsList = null }) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    // For tags, use suggestionsList if provided, else fetch emails
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
      if (suggestionsList) {
        // For tags: filter from suggestionsList
        const q = e.target.value.toLowerCase();
        setSuggestions(
          suggestionsList.filter(
            tag =>
              tag.toLowerCase().includes(q) &&
              !value.includes(tag)
          )
        );
        setShowSuggestions(true);
      } else {
        fetchEmailSuggestions(e.target.value);
        setShowSuggestions(true);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.key === "Enter" || e.key === ",") && input.trim()) {
        e.preventDefault();
        const entry = input.trim();
        if (value.includes(entry) || excludeList.includes(entry)) return;
        onChange([...value, entry]);
        setInput("");
        setSuggestions([]);
        setShowSuggestions(false);
      }
      if (e.key === "Backspace" && !input && value.length) {
        onChange(value.slice(0, -1));
      }
    };

    const handleSuggestionClick = (entry) => {
      if (value.includes(entry) || excludeList.includes(entry)) return;
      onChange([...value, entry]);
      setInput("");
      setSuggestions([]);
      setShowSuggestions(false);
      if (inputRef.current) inputRef.current.focus();
    };

    return (
      <div className="relative">
        <label className="text-slate-600 dark:text-slate-200 text-sm">{label}</label>
        <div className="flex flex-wrap gap-1 text-slate-800 dark:bg-slate-900 dark:text-slate-200 border border-slate-700 rounded px-2 py-1.5 min-h-[38px]">
          {value.map((entry, idx) => (
            <span key={entry} className="bg-blue-700 text-white px-2 py-0.5 rounded text-xs flex items-center">
              {entry}
              <button type="button" className="ml-1 text-xs" onClick={() => onChange(value.filter((v) => v !== entry))}>&times;</button>
            </span>
          ))}
          <input
            ref={inputRef}
            className="bg-transparent outline-none text-slate-600 flex-1 min-w-[100px] text-sm dark:text-slate-100"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={suggestionsList ? "Add tag and press Enter" : "Add email and press Enter"}
            onFocus={() => input && setShowSuggestions(true)}
            autoComplete="off"
          />
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-slate-800 border border-slate-700 rounded mt-1 max-h-32 overflow-y-auto">
            {suggestions.map((entry) => (
              <li
                key={entry}
                className="px-3 py-1.5 cursor-pointer hover:bg-blue-800 text-slate-100 text-sm"
                onClick={() => handleSuggestionClick(entry)}
              >
                {entry}
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

  // Add a function to check if the form is valid
  const isFormValid =
    form.email.trim() &&
    form.group.trim() &&
    form.groupId &&
    form.projectName.trim() &&
    form.description.trim() &&
    form.maintainers.length > 0 &&
    form.developers.length > 0;

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a] flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl bg-slate-100/70 dark:bg-slate-800/50  border border-slate-700 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-slate-800 dark:text-slate-200 text-2xl">Request a New GitLab Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Row 1: Email and Project Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="email" className="text-slate-600 dark:text-slate-200 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="mt-1 bg-slate-100 dark:bg-slate-900 border-slate-700 text-slate-100 h-9"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="projectName" className="text-slate-600 dark:text-slate-200 text-sm">Project Name</Label>
                <Input
                  id="projectName"
                  type="text"
                  required
                  value={form.projectName}
                  onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))}
                  className="mt-1 bg-slate-100 dark:bg-slate-900 border-slate-700 text-slate-100 h-9"
                  placeholder="Name of the new project"
                />
              </div>
            </div>

            {/* Row 2: GitLab Group and Tech Stack */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Label htmlFor="group" className="text-slate-600 dark:text-slate-200 text-sm">GitLab Group or Subgroup</Label>
                <Input
                  id="group"
                  type="text"
                  required
                  autoComplete="off"
                  value={form.group}
                  onChange={handleGroupInput}
                  className="mt-1 bg-slate-100 dark:bg-slate-900 border-slate-700 text-slate-100 h-9"
                  placeholder="Search for group..."
                />
                {loadingGroups && <div className="text-xs bg-slate-100 dark:bg-slate-900 mt-1">Searching...</div>}
                {groupSuggestions.length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 bg-slate-700 rounded mt-1 max-h-32 overflow-y-auto border border-slate-600">
                    {groupSuggestions.map((g) => (
                      <li
                        key={g.id}
                        className="px-3 py-1.5 cursor-pointer hover:bg-blue-800 text-slate-100 text-sm"
                        onClick={() => selectGroup(g)}
                      >
                        {g.full_path}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor="techStack" className="text-slate-600 dark:text-slate-200 text-sm">Tech Stack</Label>
                <Input
                  id="techStack"
                  type="text"
                  value={form.techStack}
                  onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))}
                  className="mt-1 bg-slate-100 dark:bg-slate-900 border-slate-700 text-slate-100 h-9"
                  placeholder="e.g. React, Node.js, Python"
                />
              </div>
            </div>

            {/* Row 3: Description (full width) */}
            <div>
              <Label htmlFor="description" className="text-slate-600 dark:text-slate-200 text-sm">Description</Label>
              <textarea
                id="description"
                required
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="mt-1 w-full rounded-md 
                text-slate-800 dark:text-slate-200 bg-slate-100  dark:bg-slate-900 border border-slate-700 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500
                dark:bg-slate-900 border border-slate-700 dark:text-slate-100 p-2 h-20 text-sm resize-none"
                placeholder="Describe the project and its purpose"
              />
            </div>

            {/* Row 4: Maintainers and Developers */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <TagInput
                  label="Maintainers"
                  value={form.maintainers}
                  onChange={handleMaintainersChange}
                  excludeList={form.developers}
                />
              </div>
              <div className="flex-1">
                <TagInput
                  label="Developers"
                  value={form.developers}
                  onChange={handleDevelopersChange}
                  excludeList={form.maintainers}
                />
              </div>
            </div>

            {/* Row 5: Tags (full width) */}
            <div>
              <TagInput
                label="Tags (e.g. frontend, backend, rnd)"
                value={form.tags}
                onChange={tags => setForm(f => ({ ...f, tags }))}
                excludeList={[]}
                suggestionsList={["frontend", "backend", "rnd"]}
              />
            </div>

            {/* Messages and Submit */}
            <div className="pt-2 space-y-3">
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {success && <div className="text-green-400 text-sm">{success}</div>}
              <Button type="button" onClick={handleSubmit} disabled={submitting || !isFormValid} className="w-full bg-blue-600 hover:bg-blue-700 h-10">
                {submitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}