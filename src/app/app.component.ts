import { Component } from '@angular/core';
import { TreeComponent } from './tree/tree.component';
import { TreeNode } from './node-tree/tree.modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  nodeData: TreeNode[] = [
    {
      title: 'Hospital A',
      expanded: true,
      icon: 'ri-suitcase-line',
      children: [
        {
          title: 'Shoulder',
          icon: 'ri-account-circle-line',
        },
        {
          title: 'Knee',
          icon: 'ri-account-circle-line',
        },
        {
          title: 'Stomack',
          icon: 'ri-account-circle-line',
          children: [
            {
              title: 'Crohns Disease',
              icon: 'ri-account-circle-line',
            },
            {
              title: 'Iritable Bowel Syndrome',
              icon: 'ri-account-circle-line',
            },
            {
              title: 'Ulcerative Colitis',
              icon: 'ri-account-circle-line',
            }
          ]
        }
      ]
    },
    {
      title: 'Hospital B',
      expanded: false,
      icon: 'ri-suitcase-line',
      children: [
        {
          title: 'Gamming Addiction',
          icon: 'ri-account-circle-line',
        },
        {
          title: 'Anxiety',
          icon: 'ri-account-circle-line',
        },
        {
          title: 'Depression',
          icon: 'ri-account-circle-line',
        }
      ]
    }
  ];
}
