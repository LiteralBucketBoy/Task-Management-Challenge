
/**
 * Creates and renders the task item that represents the task
 * */
export function UserItem ({ user, tasks }) {
    function getUserTaskList() {
        if(tasks!== null) {
            if (tasks !== undefined) {
                return tasks.map(
                    (item, index) => (
                        <tr key={index} className="task-item">
                            <td>
                                <input type="checkbox"
                                       defaultChecked={item.isMarked}
                                       value={item.isMarked}
                                       disabled={true}
                                />
                            </td>
                            <td>
                                <div className={item.isMarked ? "marked" : ""}>
                                    {item.taskString}
                                </div>
                            </td>
                            <td>
                                <div>{new Date(item.dateAdded).toUTCString()}</div>
                            </td>
                        </tr>
                    ))
            }
        }
    }

    return (
        <tr className="user-item" >
            <td>
                {user}
            </td>
            <td>
                <table>
                    <caption>{user} Tasks</caption>
                    <thead>
                    <tr>
                        <th>Done</th>
                        <th>Task </th>
                        <th>Date Added</th>
                    </tr>
                    </thead>
                    <tbody className="task-list">
                    {
                        getUserTaskList()
                    }
                    </tbody>
                </table>
            </td>
        </tr>
    )
}
