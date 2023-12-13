import './activy-details.scss';

import { memo } from "react";
import useGetDate from '../../../../customHooks/useGetDate';

const ActivyDetails = ({task}) => {
	const {converToTimeformat} = useGetDate();
	return (
		<div className="task-detail-tabs__item">
			<div>
				<h3 className="task-detail-activy__task-added">Added on {converToTimeformat(task.date_added)}</h3>
			</div>
		</div>
	);
}
 
export default memo(ActivyDetails);