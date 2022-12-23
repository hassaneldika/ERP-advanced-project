const ProjectStatus = ({
  name,
  status,
  showStatusProjectFormPopup,
  project_slug,
}) => {
  if (status === 0) {
    return (
      <button
        className="btn dark-btn"
        onClick={() =>
          showStatusProjectFormPopup({ status, name, project_slug })
        }
      >
        Active
      </button>
    );
  }
  return (
    <button
      className="btn edit-btn"
      onClick={() => showStatusProjectFormPopup({ status, name, project_slug })}
    >
      Done
    </button>
  );
};

export default ProjectStatus;
