import {Component, OnInit} from '@angular/core'
import {SystemDeptService} from './system-dept.service'
import {SystemDept} from './system-dept.entity'
import {ConfirmationService} from 'primeng'

@Component({
  selector: 'app-system-dept',
  templateUrl: './system-dept.component.html',
  styleUrls: ['./system-dept.component.css'],
  providers: [
    ConfirmationService
  ]
})
export class SystemDeptComponent implements OnInit {
  isLoading$ = this.systemDeptService.isLoading$
  systemDepts$ = this.systemDeptService.systemDepts$
  systemDept$ = this.systemDeptService.systemDept$

  isEditing = false
  dialogTitle = ''

  constructor(private systemDeptService: SystemDeptService, private confirmService: ConfirmationService) {
  }

  ngOnInit() {
    this.systemDeptService.getSystemDeptTree()
  }

  onAdd() {
    this.isEditing = true
    this.dialogTitle = '新增'
    this.systemDeptService.nextSystemDept(new SystemDept())
  }

  onEdit(systemDept: SystemDept) {
    this.isEditing = true
    this.dialogTitle = `修改：${systemDept.shortName}`
    this.systemDeptService.nextSystemDept(systemDept)
  }

  onDelete(systemDept: SystemDept) {
    this.confirmService.confirm({
      message: `真的要删除： <span style="color:red">${systemDept.shortName} </span> 吗？`,
      accept: () => {
        this.systemDeptService.delete(systemDept.id)
      }
    })
  }


  onSubmit() {
    this.isEditing = false
  }

  onCancel() {
    this.isEditing = false
  }

  isValid(systemDept: SystemDept) {
    const now = new Date()
    const beginDate = new Date(systemDept.beginDate)
    const endDate = new Date(systemDept.endDate)
    return (now.getTime() >= beginDate.getTime() && now.getTime() <= endDate.getTime()) ? '' : 'not-valid'
  }

}
