export class Project {
    id: string;
    timestamp: number;
    shortName: string;
    projectManager?: string;
    startDate?: string;
    deliveryDate?: string;
    workDays: number;
    status: string;
    workFrontID?: string;
}

export class DateCalculation {
    
    static workingDaysBetweenDates(start: any, end: any, holidays?: string[]) {
        let startDate = this.parseDate(start);
        let endDate = this.parseDate(end);  

        // Calculate days between dates
        let millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        startDate.setHours(0,0,0,1);  // Start just after midnight
        endDate.setHours(23,59,59,999);  // End just before midnight
        let diff = +endDate - +startDate;  // Milliseconds between datetime objects    

        // // Validate input
        // if (endDate < startDate) {
        //     return 0;
        // }

        let days = Math.ceil(diff / millisecondsPerDay);
        
        // Subtract two weekend days for every week in between
        let weeks = Math.floor(days / 7);
        days -= weeks * 2;
    
        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();
        
        // Remove weekend not previously removed.   
        if (startDay - endDay > 1) {
            days -= 2;
        }
        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6) {
            days--;  
        }
        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0) {
            days--;
        }
        
        for (let i in holidays) {
        //   if ((holidays[i] >= start) && (holidays[i] <= end)) {
        //       days--;
        //   }
          if ((this.parseDate(holidays[i]) >= startDate) && (this.parseDate(holidays[i]) <= endDate)) {
              days--;
          }
        }
        return days;
    }

    // Expected yyyy-mm-dd
    public static parseDate(input: any) {
        if(input){
            // Transform date from text to date
            let parts = input.match(/(\d+)/g);
            // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
            return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
        } else {
            return new Date(0, 0, 0);
        }
    }

    public static weekDayFromStr(dateYYYYMMDD: string){
        return this.weekDay(this.parseDate(dateYYYYMMDD).getDay());
    }

    public static weekDay(date: number){
        if(date < 0 || date > 6) {
            console.log(date);
            return -1;
        } 

        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        return weekday[date];
    }
}
