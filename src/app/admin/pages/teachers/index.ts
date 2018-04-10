import { TeachersListComponent  } from './teachers-list/teachers-list.component';
import { TeacherCreateComponent } from './teachers-list/teacher-create/teacher-create.component';
import { TeacherFormComponent   } from './teacher-form/teacher-form.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';

import { AssignedSubjectsListComponent } from './teacher-detail/assigned-subjects-list/assigned-subjects-list.component';
import { AssignedSubjectAddComponent   } from './teacher-detail/assigned-subject-add/assigned-subject-add.component';

const TEACHERS_PAGE = [
  TeachersListComponent,
  TeacherCreateComponent,
  TeacherFormComponent,
  TeacherDetailComponent,
  AssignedSubjectsListComponent,
  AssignedSubjectAddComponent
];

export {
  TEACHERS_PAGE,

  TeachersListComponent,
  TeacherCreateComponent,
  TeacherFormComponent,
  TeacherDetailComponent,
  AssignedSubjectsListComponent,
  AssignedSubjectAddComponent
};
