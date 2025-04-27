import { Injectable, signal } from '@angular/core';
import { NodeNotificationData, TreeNode } from './tree.modal';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  notification = signal<NodeNotificationData | null >(null);

  onSelectMenu(id:string, data: TreeNode, reference?: any ){
    this.notification.set({ id: id, data: data, reference:reference });
  }
}
