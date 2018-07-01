
export class Day {
  holiday:boolean;
  timeClocked: number = 0;
  unit:string = "days"

  constructor(
      private year:number, 
      private month:number, 
      private day:number, 
      private selectable:boolean
    ) { this.day=day; }

}
