import { AcademicYearsListComponent  } from './academic_year-list/academic_years-list.component';
import { AcademicYearCreateComponent } from './academic_year-list/academic_year-create/academic_year-create.component';
import { AcademicYearDetailComponent } from './academic_year-detail/academic_year-detail.component';
import { AcademicYearFormComponent   } from './academic_year-form/academic_year-form.component';
import { SemesterFormComponent       } from './semester-form/semester-form.component';
import { SemesterCreateComponent     } from './academic_year-detail/semester-create/semester-create.component';
import { SemesterItemComponent       } from './academic_year-detail/semester-item/semester-item.component';


const ACADEMIC_YEARS_PAGE = [
  AcademicYearsListComponent,
  AcademicYearCreateComponent,
  AcademicYearDetailComponent,
  AcademicYearFormComponent,
  SemesterFormComponent,
  SemesterCreateComponent,
  SemesterItemComponent
];


export {
  ACADEMIC_YEARS_PAGE,

  AcademicYearsListComponent,
  AcademicYearCreateComponent,
  AcademicYearDetailComponent,
  AcademicYearFormComponent,
  SemesterFormComponent,
  SemesterCreateComponent,
  SemesterItemComponent
};
