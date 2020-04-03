import React, {Component} from 'react';

interface IUser {
  name: string,
  id: number,
  getName(): string 
  setName: (name: string) => void
}

// abstract class People  {
//   abstract cms(value: boolean): boolean
// }

// class User extends People {
//   name: string;
//   id: number;
//   constructor (name: string) {
//     super();
//     this.name = name;
//     this.id = 1;
//   }

//   cms (value: boolean): boolean {
//     return value;
//   }

//   getName () {
//     return this.name;
//   }

//   setName (name: string): void {
//     this.name = name;
//   }
// }

interface IArray {
  length: number,
}
type StringOrInt = number | string | IArray;

export default class TS extends Component {
  itemChecker (first: number) : string
  itemChecker (first: string) : string
  itemChecker (first: number, second: number) : string
  itemChecker (first: string, second: string) : string
  itemChecker (first: any, second?: any) : string {
    if (second) {
      if (typeof first === 'number') {
        return 'two number';
      } else {
        return 'two string';
      }
    } else {
      if (typeof first === 'number') {
        return 'one number';
      } else {
        return 'one string';
      }
    }
  }

  multiPlus (...arg: Array <number>) : number {
    let counter: number = 0;
    
    arg.forEach((value) => {
      counter += value;
    });

    return counter;
  }

  generic<T extends StringOrInt>(arg: T) : T {
    return arg;
  }
  
  render () {
    // const user: IUser = new User('Jack');

    type AVS = boolean | null | undefined;

    interface AvsClub <T> {
      a: T,
      v: Array<T>,
      s: number 
    }

    // const avs: AvsClub<AVS> = {
    //   a: true,
    //   v: [true, null],
    //   s: 10
    // }
  
    return (
      <div>
        {
          this.generic<IArray>({length: 2})
        }
      </div>
    )
  }
}