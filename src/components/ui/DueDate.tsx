import type { DueDateProps } from "../../types";
import { format} from 'date-fns'
import { formatInTimeZone } from "date-fns-tz"


const DueDate = ({dueDate}:DueDateProps) => {
    if (!dueDate) return
    
    return (
        <div className='due-date--wrapper'>
            
            <div className='date_period'>
                <span className='date_month'>{formatInTimeZone(dueDate, "UTC", "MMM").toUpperCase()}</span>
                <span className='date_year'>'{formatInTimeZone(dueDate, "UTC", "yy").toUpperCase()}</span>
            </div>
            <div className='date_day'>{dueDate ? format(dueDate , 'do') : ''}</div>
            
        
        </div>
    );
}

export default DueDate;
