import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";
import Pills from "./Pills";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [skipData, setSkipData] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeSuggestion, setactiveSuggestion] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());
  const inputRef = useRef(null);
  const listItemRef = useRef([]);
  const containerRef = useRef(null);
  const handleSelectUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    // setSelectedUsersSet(new Set([...selectedUsersSet, user.email])); //since email is unique
    setSelectedUsersSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(user.email);
      return newSet;
    });
    // setSuggestions([]);
    inputRef.current.focus();
  };
  function scrollToItem(index) {
    listItemRef.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
  function handleKeyDown(e) {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    }
    if (e.key === "ArrowDown" && suggestions?.length > 0) {
      e.preventDefault();
      const newIdx =
        activeSuggestion < suggestions.length - 1 ? activeSuggestion + 1 : 0;
      setactiveSuggestion(newIdx);
      scrollToItem(newIdx);
    } else if (e.key === "ArrowUp" && suggestions?.length > 0) {
      e.preventDefault();
      const newIdx =
        activeSuggestion > 0
          ? activeSuggestion - 1
          : activeSuggestion?.length - 1;
      setactiveSuggestion(newIdx);
      scrollToItem(newIdx);
    } else if (e.key === "Enter" && suggestions?.length > 0) {
      handleSelectUser(suggestions[activeSuggestion]);
    } else if (e.target.value.length > 1) {
      const filtered = userData.filter((x) => x.name.includes(e.target.value));
      setSuggestions(filtered);
    } else if (e.key === "Backspace" && e.target.value.length === 1)
      // empty suggestion when search field is empty
      setSuggestions([]);
    else return;
  }
  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selectedUsers) => selectedUsers.id !== user.id
    );
    setSelectedUsers(updatedUsers);
    const updatedEmails = new Set(selectedUsersSet);
    updatedEmails.delete(user.email);
    setSelectedUsersSet(updatedEmails);
  };
  const fetchUsers = useCallback(async () => {
    const res = await fetch(`https://dummyjson.com/users?skip=${skipData}`);
    const data = await res.json();
    const { limit, skip, total } = data;
    const modifiedData = data.users.map((x) => {
      return {
        ...x,
        name: x.firstName + " " + x.lastName,
      };
    });
    setUserData((prev) => [...prev, ...modifiedData]); // preserving old values
    if (skip + limit < total) setSkipData(skip + limit);
    else setLoading(false);
  }, [skipData]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    function handleMouseMovement(e) {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setSuggestions([]);
    }
    document.addEventListener("mousedown", handleMouseMovement);
    return () => document.removeEventListener("mousedown", handleMouseMovement);
  }, []);
  return (
    !loading && (
      <>
        <div className="user-search-container">
          <div className="user-search-input" ref={containerRef}>
            {/* Pills */}
            {selectedUsers.length > 0 &&
              selectedUsers.map((user) => (
                <Pills
                  key={user.email}
                  image={user.image}
                  text={`${user.firstName} ${user.lastName}`}
                  onClick={() => handleRemoveUser(user)}
                />
              ))}
            {/* inputs field with search suggestions */}
            <div style={{ width: "100%" }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="search for user"
                ref={inputRef}
                onKeyDown={handleKeyDown}
              />
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((user, i) => {
                    // hiding selected users from suggestion list
                    return !selectedUsersSet.has(user.email) ? (
                      <li
                        onClick={() => handleSelectUser(user)}
                        key={user.id}
                        className={activeSuggestion == i ? "active" : ""}
                        ref={(el) => (listItemRef.current[i] = el)}
                      >
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                      </li>
                    ) : (
                      <></>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default App;
