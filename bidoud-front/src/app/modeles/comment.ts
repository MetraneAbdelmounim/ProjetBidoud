export class Comment {
  _id:string
  firstname: string
  lastname:string
  phone  :string
  email : string
  message:string
  date:string
  stateVu:boolean

  static  dateToString(dateDis :string):string {
    const date = new Date(dateDis)

    let instant = new Date();
    const time = ((instant.getTime()-date.getTime()) / 60000)
    if (Math.trunc(time )== 0) {
      return "just now";
    }
    else if (time < 60) {
      return Math.trunc(time) + " min";
    }
    else if (time >= 60 && time < 1440) {
      return Math.trunc(time / 60) + " h ";
    }else{
      const hr=Math.trunc(time/1440)
      const months = Math.trunc(time/(1440*30))
      const years = Math.trunc(time/(1440*30*12))
      if (hr<31 ) {

        return (hr==1) ? hr+ " day ": hr + " days ";
      }

      if (months<12) {

        return months + " months ";
      }
      else  {

        return  (years==1) ? years + " year ":years + " years ";
      }
    }


  }
}
