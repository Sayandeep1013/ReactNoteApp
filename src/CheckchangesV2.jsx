// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import {
//   FaEdit,
//   FaSave,
//   FaTrash,
//   FaTimes,
//   FaExpandAlt,
//   FaCompressAlt,
// } from "react-icons/fa";

// const NoteWrapper = styled.div`
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   padding: 15px;
//   border-radius: 8px;
//   background: ${({ theme }) => theme.noteBackground};
//   color: ${({ theme }) => theme.color};
//   position: relative;

//   min-height: 150px;
//   max-height: ${({ isEditing, isExpanded }) =>
//     isExpanded ? "none" : isEditing ? "300px" : "200px"};
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   transition: all 0.3s ease, transform 0.3s ease;
//   transform: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "scale(1.05)" : "scale(1)"};
//   z-index: ${({ isEditing, isExpanded }) => (isEditing || isExpanded ? 10 : 1)};
//   box-shadow: ${({ theme }) => theme.noteShadow};

//   position: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "fixed" : "relative"};
//   top: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "50%" : "auto"};
//   left: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "50%" : "auto"};
//   transform: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "translate(-50%, -50%) scale(1.5)" : "scale(1)"};
//   width: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "calc(50% - 30px)" : "auto"};
//   max-width: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "600px" : "none"};
//   max-height: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "80vh" : "200px"};
//   overflow-y: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? "auto" : "hidden"};
//   z-index: ${({ isEditing, isExpanded }) =>
//     isEditing || isExpanded ? 100 : 1};

//   background: ${({ color }) => `
//     linear-gradient(
//       135deg,
//       ${color}ee,
//       ${color}99,
//       ${color}44,
//       ${color}22
//     ),
//     rgba(255, 255, 255, 0.1)
//   `};
//   backdrop-filter: blur(10px);
//   // box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//   border: 1px solid rgba(255, 255, 255, 0.18);
//   overflow: hidden;
//   position: relative;

//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     opacity: 0.5;
//     pointer-events: none;
//   }
// `;

// const NoteOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
//   z-index: 5;
// `;

// const EditOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   backdrop-filter: blur(5px);
//   display: ${({ show }) => (show ? "block" : "none")};
//   z-index: 5;
// `;

// const NoteContent = styled.div`
//   flex-grow: 1;
//   overflow: hidden;
// `;

// const NoteTitle = styled.h3`
//   margin-bottom: 5px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const NoteDescription = styled.p`
//   margin-bottom: 5px;
//   display: -webkit-box;
//   -webkit-line-clamp: ${({ isExpanded }) => (isExpanded ? "none" : "3")};
//   -webkit-box-orient: vertical;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const NoteCategory = styled.span`
//   font-size: 0.8em;
//   font-style: italic;
//   margin-bottom: 15px;
//   display: block;
// `;

// const NoteActions = styled.div`
//   position: absolute;
//   bottom: 10px;
//   left: 10px;
//   right: 10px;
//   display: flex;
//   justify-content: space-between;
//   margin-top: 10px;
// `;
// const ActionButton = styled.button`
//   padding: 5px;
//   font-size: 14px;
//   bottom: -10px;
//   cursor: pointer;
//   background-color: transparent;
//   color: ${({ theme }) => theme.buttonColor};
//   border: none;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   transition: opacity 0.3s ease;

//   &:hover {
//     opacity: 0.8;
//   }

//   &:hover::after {
//     content: attr(data-tooltip);
//     position: absolute;
//     bottom: 80%;
//     left: 50%;
//     transform: translateX(-50%);
//     background-color: transparent;
//     color: ${({ theme }) => theme.buttonColor};
//     padding: 5px;
//     border-radius: 5px;
//     font-size: 12px;
//     white-space: nowrap;
//     z-index: 1;
//     overflow: hidden;
//   }
// `;

// const EditInput = styled.input`
//   margin-bottom: 18px;
//   padding: 5px;
//   font-size: 14px;
//   width: calc(100% - 10px);
//   background-color: ${({ theme }) => theme.inputBackground};
//   color: ${({ theme }) => theme.inputColor};
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   border-radius: 5px;
//   outline: none;
// `;

// const EditTextarea = styled.textarea`
//   margin-bottom: 5px;
//   padding: 5px;
//   font-size: 14px;
//   width: calc(100% - 10px);
//   height: 80px;
//   background-color: ${({ theme }) => theme.inputBackground};
//   color: ${({ theme }) => theme.inputColor};
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   border-radius: 5px;
//   resize: none;
//   outline: none;
// `;

// const PriorityIndicator = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   border: 2px solid
//     ${({ priority }) =>
//       priority === "high" ? "red" : priority === "mid" ? "yellow" : "green"};
// `;

// function Note({ note, index, deleteNote, editNote }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(note.title);
//   const [editedDescription, setEditedDescription] = useState(note.description);
//   const [editedCategory, setEditedCategory] = useState(note.category);
//   const noteRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (noteRef.current && !noteRef.current.contains(event.target)) {
//         setIsExpanded(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [noteRef]);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     editNote(index, {
//       title: editedTitle,
//       description: editedDescription,
//       category: editedCategory,
//     });
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedTitle(note.title);
//     setEditedDescription(note.description);
//     setEditedCategory(note.category);
//     setIsEditing(false);
//   };

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <>
//       <EditOverlay show={isEditing || isExpanded} />
//       <NoteOverlay isExpanded={isExpanded} />
//       <NoteWrapper
//         ref={noteRef}
//         isEditing={isEditing}
//         isExpanded={isExpanded}
//         color={note.color || "#564332"}
//       >
//         <PriorityIndicator priority={note.priority} />
//         {isEditing ? (
//           <NoteContent>
//             <EditInput
//               type="text"
//               value={editedTitle}
//               onChange={(e) => setEditedTitle(e.target.value)}
//             />
//             <EditTextarea
//               value={editedDescription}
//               onChange={(e) => setEditedDescription(e.target.value)}
//             />
//             <EditInput
//               type="text"
//               value={editedCategory}
//               onChange={(e) => setEditedCategory(e.target.value)}
//               placeholder="Category"
//             />
//           </NoteContent>
//         ) : (
//           <NoteContent>
//             <NoteTitle>{note.title}</NoteTitle>
//             <NoteDescription isExpanded={isExpanded}>
//               {note.description}
//             </NoteDescription>
//             {note.category && (
//               <NoteCategory>Category: {note.category}</NoteCategory>
//             )}
//           </NoteContent>
//         )}
//         <NoteActions>
//           {isEditing ? (
//             <>
//               <ActionButton onClick={handleSave} data-tooltip="Save">
//                 <FaSave />
//               </ActionButton>
//               <ActionButton onClick={handleCancel} data-tooltip="Cancel">
//                 <FaTimes />
//               </ActionButton>
//             </>
//           ) : (
//             <>
//               <ActionButton onClick={handleEdit} data-tooltip="Edit">
//                 <FaEdit />
//               </ActionButton>
//               <ActionButton
//                 onClick={toggleExpand}
//                 data-tooltip={isExpanded ? "Collapse" : "Expand"}
//               >
//                 {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
//               </ActionButton>
//               <ActionButton
//                 onClick={() => deleteNote(index)}
//                 data-tooltip="Delete"
//               >
//                 <FaTrash />
//               </ActionButton>
//             </>
//           )}
//         </NoteActions>
//       </NoteWrapper>
//     </>
//   );
// }

// export default Note;

/*    setEditedCategory(note.category);
    setIsEditing(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <NoteOverlay isExpanded={isExpanded} onClick={handleCollapse} />
      <NoteWrapper
        isEditing={isEditing}
        isExpanded={isExpanded}
        color={note.color}
        ref={noteRef}
      >
        <PriorityIndicator priority={note.priority} />
        {isEditing ? (
          <>
            <EditInput
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <EditTextarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <EditInput
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
            <NoteActions>
              <ActionButton onClick={handleSave} data-tooltip="Save">
                <FaSave />
              </ActionButton>
              <ActionButton onClick={handleCancel} data-tooltip="Cancel">
                <FaTimes />
              </ActionButton>
            </NoteActions>
          </>
        ) : (
          <>
            <NoteContent>
              <NoteTitle>{note.title}</NoteTitle>
              <NoteDescription isExpanded={isExpanded}>
                {note.description}
              </NoteDescription>
              <NoteCategory>{note.category}</NoteCategory>
            </NoteContent>
            <NoteActions>
              <ActionButton onClick={handleEdit} data-tooltip="Edit">
                <FaEdit />
              </ActionButton>
              <ActionButton onClick={() => deleteNote(index)} data-tooltip="Delete">
                <FaTrash />
              </ActionButton>
              <ActionButton
                onClick={isExpanded ? handleCollapse : handleExpand}
                data-tooltip={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
              </ActionButton>
            </NoteActions>
          </>
        )}
      </NoteWrapper>
    </>
  );
}

export default Note;
*/
