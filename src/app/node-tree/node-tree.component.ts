import { Component, inject, Input } from '@angular/core';
import { EventType, TreeNode } from './tree.modal';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { NodeService } from './node.service';

@Component({
  selector: 'app-node-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-tree.component.html',
  styleUrl: './node-tree.component.scss'
})
export class NodeTreeComponent {

  nodeRef!: TreeNode;
  nodeService: NodeService = inject(NodeService);
  @Input('node') node!: any;
  @Input('parentNode') parentNode!: any;

  isNode(item: any) {
    return item.children && item.children.length > 0
  }

  toggleNode(item: TreeNode) {
    item.expanded = !item.expanded
  }

  showMenu(event: MouseEvent, nodeReference: TreeNode) {
    this.nodeService.onSelectMenu(EventType.SHOW_MENU, nodeReference, { event: event, parentNode: this.parentNode })
  }

  saveNode(val: string, nodeReference: TreeNode) {
    this.nodeService.onSelectMenu(EventType.SAVE_NODE, nodeReference, val)
  }

  clearNode(nodeReference: TreeNode) {
    this.nodeService.onSelectMenu(EventType.CLEAR_NODE, nodeReference, { event: event, parentNode: this.parentNode })
  }


}
