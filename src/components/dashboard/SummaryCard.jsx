const SummaryCard = ({ title, value }) => {
  return (
    <div className="col-md-3">
      <div className="card bg-dark text-white p-3 border-0 shadow">
        <h6 className="text-secondary">{title}</h6>

        <h2 className="fw-bold text-orange">{value}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;
