import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Note from "./Note";
import ThemeToggle from "./ThemeToggle";
import { FaPlus, FaCheck } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const lightTheme = {
    background: "#D5D4D4",
    color: "#333333",
    inputBackground: "#ffffff",
    inputColor: "#333333",
    buttonBackground: "#e0e0e0",
    buttonColor: "#333333",
    borderColor: "#e0e0e0",
    noteBackground: "#ffffff",
    noteShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  };
  
  const darkTheme = {
    background: "#0D1117",
    color: "#e0e0e0",
    inputBackground: "#2d2d2d",
    inputColor: "#e0e0e0",
    buttonBackground: "#4a4a4a",
    buttonColor: "#e0e0e0",
    borderColor: "#3d3d3d",
    noteBackground: "#2d2d2d",
    noteShadow:
      "0 1px 3px rgba(255,255,255,0.1), 0 1px 2px rgba(255,255,255,0.2)",
  };
  
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
  
  const Title = styled.h1`
    text-align: center;
    flex-grow: 1;
  `;
  
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const NoteInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  @media (min-width: 768px) {
    max-width: 45%;
  }
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  height: 150px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 8px;
  height: 40px;

  &:hover {
    opacity: 0.7;
  }
`;

const ColorButtonWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const ColorButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  & > span {
    flex: 1;
    text-align: center;
  }
`;

const PriorityIndicator = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid
    ${({ priority }) =>
      priority === "high" ? "red" : priority === "mid" ? "yellow" : "green"};
`;

const ColorBox = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ColorPaletteWrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.buttonBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  z-index: 2;
  top: 100%;
  left: 0;
  margin-top: 5px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.borderColor};

  &:hover {
    transform: scale(1.1);
  }
`;

const NoteListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    max-width: 55%;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    overflow-y: auto;
  }
`;

const NoteList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // Increased note width
  gap: 15px;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 8px;
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.background};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.borderColor};
      border-radius: 4px;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    body {
      overflow: auto;
    }
  }
`;

const NoteActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const SaveIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  padding: 10px;
  border-radius: 50%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  z-index: 1000;
`;

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [priority, setPriority] = useState("mid");
  const [color, setColor] = useState("#808080");
  const [showAll, setShowAll] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
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
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDarkTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setShowSaveIndicator(true);
    const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
    return () => clearTimeout(timer);
  }, [notes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".color-button-wrapper")) {
        setShowColorPalette(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const addNote = () => {
    if (title.trim() && description.trim()) {
      const newNote = { title, description, priority, color, category };
      setNotes([newNote, ...notes]);
      setTitle("");
      setDescription("");
      setPriority("mid");
      setCategory("");
      setColor("#808080");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index, updatedNote) => {
    const newNotes = notes.map((note, i) =>
      i === index ? { ...note, ...updatedNote } : note
    );
    setNotes(newNotes);
  };


  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotes(items);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const resetAllNotes = () => {
    setNotes([]);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const togglePriority = () => {
    const priorities = ["low", "mid", "high"];
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    setPriority(priorities[nextIndex]);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setShowColorPalette(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.category &&
        note.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleNotes = showAll ? filteredNotes : filteredNotes.slice(0, 6);


  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Wrapper>
        <GlobalStyle />
        <Header>
          <Title>Note App</Title>
          <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={setIsDarkTheme} />
        </Header>
        <Container>
        <NoteInput>
            <InputField
              type="text"
              placeholder="Add your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextArea
              placeholder="Add your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputField
              type="text"
              placeholder="Add a category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <ButtonRow>
              <Button onClick={togglePriority}>
                Priority
                <PriorityIndicator priority={priority} />
              </Button>
              <ColorButtonWrapper className="color-button-wrapper">
                <ColorButton
                  onClick={() => setShowColorPalette(!showColorPalette)}
                >
                  ㅤㅤㅤColour select
                  <ColorBox color={color} />
                  ㅤㅤㅤ
                </ColorButton>
                {showColorPalette && (
                  <ColorPaletteWrapper>
                    {colorOptions.map((colorOption) => (
                      <ColorOption
                        key={colorOption}
                        color={colorOption}
                        onClick={() => handleColorChange(colorOption)}
                      />
                    ))}
                  </ColorPaletteWrapper>
                )}
              </ColorButtonWrapper>
              <Button onClick={addNote}>
                <FaPlus />
                Add Note
              </Button>
            </ButtonRow>
          </NoteInput>
          <NoteListWrapper>
            <InputField
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <NoteList>
              {visibleNotes.map((note, index) => (
                <Note
                  key={index}
                  index={index}
                  note={note}
                  deleteNote={deleteNote}
                  editNote={editNote}
                />
              ))}
            </NoteList>
            <NoteActions>
              {notes.length > 1 && (
                <Button onClick={resetAllNotes}>Reset All</Button>
              )}
              {filteredNotes.length > 6 && (
                <Button onClick={toggleShowAll}>
                  {showAll ? "Show Less" : "See All"}
                </Button>
              )}
            </NoteActions>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="notes">
                {(provided) => (
                  <NoteList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {notes.map((note, index) => (
                      <Draggable
                        key={index}
                        draggableId={`note-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Note
                              note={note}
                              index={index}
                              deleteNote={deleteNote}
                              editNote={editNote}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </NoteList>
                )}
              </Droppable>
            </DragDropContext>
          </NoteListWrapper>
        </Container>
        <SaveIndicator show={showSaveIndicator}>
          <FaCheck />
        </SaveIndicator>
      </Wrapper>
    </ThemeProvider>
  );
}

export default NoteApp;