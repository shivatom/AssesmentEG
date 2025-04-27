export type TreeNode = {
    title: string,
    expanded?: boolean,
    editMode?:boolean;
    icon?: string,
    readonly topLevel?: boolean,
    children?: TreeNode[]
    clinicians?: Clinicians[]
}

export interface NodeNotificationData {
    id: string | null; 
    data: TreeNode  ;
    reference?: any;
}

export type Clinicians  ={
    name: string,
    groupName: string
}

export enum EventType  {
    ADD_CLINICIANS = "ADD_CLINICIANS",
    SHOW_MENU = "SHOW_MENU" ,
    CLEAR_NODE = "CLEAR_NODE",
    SAVE_NODE = "SAVE_NODE"  
}
  