
export class Day {
  holiday:boolean;
  timeClocked: number = 0;
  unit:string = "days";

  constructor(
      private year:number,
      private month:number,
      private day:number,
      public selectable:boolean,
      public override?:string
    ) {
      }

      getDisplayValue(){
        if(this.override){
          return this.override;
        }
        return this.day;

      }

}
