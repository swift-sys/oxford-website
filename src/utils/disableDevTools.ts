export function disableDevTools() {
const handleContextMenu = (event: MouseEvent) => {
event.preventDefault();
};

const handleKeyDown = (event: KeyboardEvent) => {
if (
event.key === "F12" ||
(event.ctrlKey &&
event.shiftKey &&
["I", "J", "C"].includes(event.key.toUpperCase())) ||
(event.ctrlKey && event.key.toUpperCase() === "U")
) {
event.preventDefault();
}
};

document.addEventListener("contextmenu", handleContextMenu);
document.addEventListener("keydown", handleKeyDown);

return () => {
document.removeEventListener("contextmenu", handleContextMenu);
document.removeEventListener("keydown", handleKeyDown);
};
}
