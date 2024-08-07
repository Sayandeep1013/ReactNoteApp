const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
