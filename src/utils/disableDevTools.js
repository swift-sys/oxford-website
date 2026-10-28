export function disableDevTools() {
  // Disable right-click
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  // Block common DevTools keyboard shortcuts
  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();

    const devToolsShortcut =
      event.key === "F12" ||
      (event.ctrlKey &&
        event.shiftKey &&
        ["i", "j", "c"].includes(key)) ||
      (event.metaKey &&
        event.altKey &&
        ["i", "j", "c"].includes(key)) ||
      (event.ctrlKey && key === "u") ||
      (event.metaKey && key === "u");

    if (devToolsShortcut) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeyDown, true);

  // Cleanup function
  return () => {
    document.removeEventListener("contextmenu", handleContextMenu);
    document.removeEventListener("keydown", handleKeyDown, true);
  };
}
