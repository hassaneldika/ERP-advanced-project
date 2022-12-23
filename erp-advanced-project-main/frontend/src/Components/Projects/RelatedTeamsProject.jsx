const RelatedTeamsProject = ({
  name,
  slug,
  showAssignProjectFormPopup,
  project_slug,
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <button
        className="btn dark-btn"
        onClick={() => showAssignProjectFormPopup({ name, slug, project_slug })}
      >
        Assign Roles
      </button>
    </div>
  );
};

export default RelatedTeamsProject;
