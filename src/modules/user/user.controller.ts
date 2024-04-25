import { Controller, Get } from '@nestjs/common';
import {  User } from '../../dto/user.dto';
import { UserService } from './user.service';
import { SummaryByDepartmentResponse } from '../../dto/response.dto';
@Controller()
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Get()
  async summryByDepartment (): Promise<any>
   {
    let users : User[] = await this.userService.list()
    let departmentSumary: SummaryByDepartmentResponse = users.reduce((acc: SummaryByDepartmentResponse, user: User) =>{
      if (!acc?.[user.company.department]) {
        acc[user.company.department] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {
          },
          addressUser: {
          }
        }
      }
      acc[user.company.department][user.gender]+=1
      if (!!acc[user.company.department]["hair"][user.hair.color]) {
        acc[user.company.department]["hair"][user.hair.color]+=1
      }else{
        acc[user.company.department]["hair"][user.hair.color]=1
      }
      acc[user.company.department]["addressUser"][user.firstName+user.lastName] = user.address.postalCode
      return acc
    },{})
    Object.keys(departmentSumary).forEach(department=>{
      const departmentUserAge = users.filter(user=>user.company.department==department).sort((a,b)=>a.age-b.age).map(user=>user.age)
      departmentSumary[department].ageRange = `${departmentUserAge[0]}-${departmentUserAge[departmentUserAge.length-1]}`
    })
    return departmentSumary
  }
}
