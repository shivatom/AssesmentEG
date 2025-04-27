import { Component, effect, inject, Input, ViewChild } from '@angular/core';
import { Clinicians, EventType, TreeNode } from '../node-tree/tree.modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NodeTreeComponent } from '../node-tree/node-tree.component';
import { NodeService } from '../node-tree/node.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'custom-tree',
  standalone: true,
  imports: [CommonModule, ContextMenuComponent, NodeTreeComponent, FormsModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {
  nodeRef!              : TreeNode;
  nodeService           : NodeService = inject(NodeService);
  selectedNode!         : TreeNode;
  showCliniciansForm!   : boolean | undefined;
  cliniciansValue!      : string;
  private _nodes        : TreeNode[] = [];
  @Input('data') 
  set nodes(value: TreeNode[]) {
    this._nodes =  [
      {
        title: '',
        expanded: true,
        children: value,
        topLevel: true
      }
    ]
  }
  get nodes(): TreeNode[] {
    return this._nodes;
  }

  @ViewChild("groupMenu") groupContextMenu!: ContextMenuComponent;

  constructor() {
    effect(() => {
      if (this.nodeService.notification()?.id === EventType.SHOW_MENU) {
        this.showCliniciansForm = false;
        this.updateNotificationData();
        this.groupContextMenu.showMenu(this.nodeService.notification()?.reference.event);
      } else if (this.nodeService.notification()?.id === EventType.SAVE_NODE) {
        this.updateNotificationData();
        this.saveNode(this.nodeService.notification()?.reference)
      } else if (this.nodeService.notification()?.id === EventType.CLEAR_NODE) {
        this.updateNotificationData();
        this.clearNode();
      }
    });
  }


  updateNotificationData() {
    let data = this.nodeService.notification()?.data;
    if (data) {
      this.selectedNode = data
    }
  }

  editGroup() {
    this.selectedNode.editMode = true
  }

  createChildNode() {
    this.selectedNode.expanded = true;
    if (!this.selectedNode.children) this.selectedNode.children = [];
    this.selectedNode.children?.unshift({
      title: '',
      editMode: true,
      icon: 'ri-account-circle-line',
    })
  }

  deleteGroup() {
    if (this.selectedNode.children && this.selectedNode.children?.length > 0) {
      alert("This group has children, You can not delete this Group!!")
    } else {
      let result = confirm("are you sure want to delete")
      if (result)
        this.removeNode()
    }
  }

  saveNode(val: string) {
    if (val.trim().length === 0 || this.hasSpecialCharacters(val)) {
      alert("Enter valid group name.")
    } else {
      this.selectedNode.title = val;
      this.selectedNode.editMode = false;
    }
  }

  clearNode() {
    if (this.selectedNode.title.trim().length === 0) {
      this.removeNode()
    } else {
      this.selectedNode.editMode = false;
    }
  }

  deleteClinician(item: any) {
    let index: any = this.selectedNode?.clinicians?.findIndex(res => res == item);
    this.selectedNode?.clinicians?.splice(index, 1);
  }

  removeNode() {
    console.log(this.nodeService.notification()?.reference);
    let parentNode = this.nodeService.notification()?.reference.parentNode;
    if(parentNode.children){
      let index = parentNode.children.findIndex((res: any) => res == this.selectedNode);
      parentNode.children.splice(index, 1);
    } else {
      let index = parentNode.findIndex((res: any) => res == this.selectedNode);
      parentNode.splice(index, 1);
    }
  }

  hasSpecialCharacters(str: string): boolean {
    const regex = /[^a-zA-Z0-9 ]/;
    return regex.test(str);
  }

  addClinicians() {
    this.showCliniciansForm = true;
  }

  updateCliniciansData() {
    if (this.selectedNode && this.selectedNode.clinicians == undefined)
      this.selectedNode.clinicians = []
    this.selectedNode?.clinicians?.push({
      name: this.cliniciansValue,
      groupName: this.selectedNode.title
    });
    this.cliniciansValue = "";
  }
}
