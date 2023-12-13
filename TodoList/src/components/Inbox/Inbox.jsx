import '../Home/main.scss';

import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import DataSort from "react-data-sort";
import Context from "../../contexts/context";
import Tasks from "../Tasks/Tasks";
import AddTask from "../AddTask/AddTask";
import useGetCountTasks from "../../customHooks/useGetCountTasks";
import Sort from "../Sort/Sort";
import SubSort from "../Sort/components/SubSort/SubSort";

const Inbox = () => {
	const { addForm,tasks } = useContext(Context);
	const {countTaskAll} = useGetCountTasks();
	const { t } = useTranslation();
	const page = "inbox";
	// for sort
	const [selectItemSort,setSelectItemSort] = useState(JSON.parse(localStorage.getItem('sort')) ?? {home: {}, inbox: {}});
	useEffect(() => {
		// title for page
		document.title = `${t("inbox")} | TodoList`;
	})
	return (
		<>
			<section className="main__content container">
				<div className="main__header">
					<h2 className="main__title"><span>{t("inbox")}</span></h2>
					<Sort selectItemSort={selectItemSort} setSelectItemSort={setSelectItemSort} project={page} />
				</div>
				{JSON.stringify(selectItemSort?.inbox) !== '{}' && 
				<SubSort selectItemSort={selectItemSort} setSelectItemSort={setSelectItemSort} project={page} />}
				{tasks && 
				<DataSort
					data={tasks.length > 0 ? tasks : [{0:null}]}
					defaultSortBy={selectItemSort.inbox?.sorted_by}
					sortBy = {selectItemSort.inbox?.sorted_by === 'alphabetically' ? 'body' : selectItemSort.inbox?.sorted_by}
					direction= {selectItemSort.inbox?.sort_order}
					render={({data}) => (
						<Tasks tasks={data} page={page}/>
					)}
				/>}
				<AddTask/>
			</section>
			{tasks && !countTaskAll && !addForm ? 
				<div className="main__day-of">
					<i className="fas fa-poo main-day-of__logo"></i>
					<p className="main-day-of__text">{t("inboxEndTaskPart1")}</p>
					<p className="main-day-of__sub-text">{t("inboxEndTaskPart2")}</p>
				</div> 
				: null
			}
		</>
	);
}
 
export default Inbox;