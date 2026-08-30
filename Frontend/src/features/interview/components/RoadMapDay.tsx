import { PreparationPlanItem } from "../types/interview.types";

const RoadMapDay = ({ plan }: { plan: PreparationPlanItem }) => (
  <div className="roadmap-day">
    <div className="roadmap-day__header">
      <span className="roadmap-day__badge">Day {plan.day}</span>
      <h3 className="roadmap-day__focus">{plan.focus}</h3>
    </div>
    <ul className="roadmap-day__tasks">
      {plan.tasks.map((task) => (
        <li key={plan._id}>
          <span className="roadmap-day__bullet" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

export default RoadMapDay;
