import {getMonth} from'./index';

describe("test func month", () =>{
 
it("get august", () => expect(getMonth(8)).toBe('август'));
it("get invalid", () => expect(getMonth(14)).toBe('неизвестно'));
it("get error", () => expect(getMonth(13)).toBe('13 месяц'));
})