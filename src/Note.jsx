import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  FaEdit,
  FaSave,
  FaTrash,
  FaTimes,
  FaExpandAlt,
  FaCompressAlt,
} from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NoteWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 15px;
  border-radius: 5px;
  background: ${({ theme, color }) => `
    linear-gradient(
      135deg,
      ${color}ee,
      ${color}99,
      ${color}44,
      ${color}22
    ),
    ${theme.noteBackground}
  `};
  color: ${({ theme }) => theme.color};
  position: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "fixed" : "relative"};
  top: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "50%" : "auto"};
  left: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "50%" : "auto"};
  transform: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "translate(-50%, -50%)" : "none"};
  width: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "90%" : "auto"};
  height: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "33%" : "auto"};
  max-width: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "1500px" : "none"};
  max-height: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "100vh" : "300px"};
  overflow-y: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? "auto" : "hidden"};
  z-index: ${({ isEditing, isExpanded }) =>
    isEditing || isExpanded ? 100 : 1};
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.noteShadow};
`;

const NoteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};
  z-index: 99;
`;

const NoteContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const NoteTitle = styled.h3`
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteDescription = styled.p`
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ isExpanded }) => (isExpanded ? "none" : "3")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteCategory = styled.span`
  font-size: 0.8em;
  font-style: italic;
  margin-bottom: 15px;
  display: block;
`;

const NoteActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const EditInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  width: calc(100% - 10px);
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  outline: none;
`;

const EditTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  width: calc(100% - 10px);
  height: 100px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  resize: vertical;
  outline: none;
`;

const PriorityIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid
    ${({ priority }) =>
      priority === "high" ? "red" : priority === "mid" ? "yellow" : "green"};
`;

const PrioritySelect = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  outline: none;
`;

const ColorSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid
    ${({ selected, theme }) => (selected ? theme.buttonColor : "transparent")};
`;

function Note({ note, index, deleteNote, editNote, onCreateNote, onDragEnd }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const [editedCategory, setEditedCategory] = useState(note.category);
  const [editedPriority, setEditedPriority] = useState(note.priority);
  const [editedColor, setEditedColor] = useState(note.color);
  const noteRef = useRef(null);
  const colorOptions = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#A569BD",
    "#FFB6C1",
    "#8A2BE2",
    "#00CED1",
    "#FFD700",
    "#ADFF2F",
    "#7FFFD4",
    "#FF6347",
    "#40E0D0",
    "#DA70D6",
    "#FFE4B5",
    "#FF4500",
    "#DEB887",
    "#BDB76B",
  ];

  useEffect(() => {
    setEditedTitle(note.title);
    setEditedDescription(note.description);
    setEditedCategory(note.category);
    setEditedPriority(note.priority);
    setEditedColor(note.color);
  }, [note]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setIsExpanded(false);
        setIsEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noteRef]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleSave = () => {
    if (
      editedTitle.trim() === "" ||
      editedDescription.trim() === "" ||
      editedCategory.trim() === ""
    ) {
      alert("Title and description and catefory cannot be empty.");
      return;
    }
    editNote(index, {
      title: editedTitle,
      description: editedDescription,
      category: editedCategory,
      priority: editedPriority,
      color: editedColor,
    });
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedDescription(note.description);
    setEditedCategory(note.category);
    setEditedPriority(note.priority);
    setEditedColor(note.color);
    setIsEditing(false);
    setIsExpanded(false);
  };

  const toggleExpand = () => {
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleColorSelect = (color) => {
    setEditedColor(color);
  };

  return (
    <>
      <NoteWrapper
        ref={noteRef}
        isEditing={isEditing}
        isExpanded={isExpanded}
        color={editedColor}
      >
        <PriorityIndicator priority={note.priority} />
        {isEditing ? (
          <>
            <EditInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <EditTextarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
            />
            <EditInput
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              placeholder="Category"
            />
            <PrioritySelect
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="mid">Mid</option>
              <option value="high">High</option>
            </PrioritySelect>
            <ColorSelect>
              {colorOptions.map((colorOption) => (
                <ColorOption
                  key={colorOption}
                  color={colorOption}
                  selected={colorOption === editedColor}
                  onClick={() => handleColorSelect(colorOption)}
                />
              ))}
            </ColorSelect>
            <NoteActions>
              <ActionButton onClick={handleSave}>
                <FaSave />
              </ActionButton>
              <ActionButton onClick={handleCancel}>
                <FaTimes />
              </ActionButton>
            </NoteActions>
          </>
        ) : (
          <>
            <NoteContent onClick={toggleExpand}>
              {" "}
              <NoteTitle>{note.title}</NoteTitle>
              <NoteDescription isExpanded={isExpanded}>
                {" "}
                {note.description}
              </NoteDescription>
              <NoteCategory>{note.category}</NoteCategory>
            </NoteContent>
            <NoteActions>
              <ActionButton onClick={handleEdit}>
                <FaEdit />
              </ActionButton>
              <ActionButton onClick={() => deleteNote(index)}>
                <FaTrash title="Delete" />
              </ActionButton>
              <ActionButton onClick={toggleExpand}>
                {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
              </ActionButton>
            </NoteActions>
          </>
        )}
      </NoteWrapper>
      {(isEditing || isExpanded) && <NoteOverlay show />}
    </>
  );
}

export default Note;
