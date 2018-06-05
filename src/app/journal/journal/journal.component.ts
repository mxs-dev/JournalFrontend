import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TeachesService, LessonService, GradeService, AuthService, AlertService } from '../../_shared/services';
import { Teaches, Grade, Student, Lesson } from '../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-journal',
  templateUrl: 'journal.component.html',
  styles: [`
    .label-practice {
      color:Gold;
    }
    .label-kr {
      color: MediumVioletRed;
    }
    .label-exam {
      color: Red;
    }
    .badge-practice {
      color: #555;
      background-color: LemonChiffon;
    }
    .badge-kr {
      background-color: MediumVioletRed;
    }
    .badge-exam {
      background-color: Red;
    }
  `]
})
export class JournalComponent implements OnInit, OnDestroy {
  protected teachesId: number;
  protected currentUser = this.authService.getCurrentUser();

  public teaches: Teaches;
  public isLoadingTeaches   = true;
  public isCalculatingTotal = false;
  public currentDate: Date;

  public attendancePercent:  number;
  public performancePercent: number;


  public studentsWithGrades: Student[];


  protected componentDestroyed = new Subject<void>();

  public constructor (
    private teachesService: TeachesService,
    private lessonService: LessonService,
    private gradeService: GradeService,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}


  public ngOnInit () {
    this.route.params.takeUntil(this.componentDestroyed)
      .subscribe(this.getRouteParamsAndLoadData.bind(this));

    this.currentDate = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDay());
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  protected async getRouteParamsAndLoadData (params: any) {
    this.teachesId = params['id'];

    if (!this.checkAccess()) return;

    await this.loadTeaches();
    this.createStudentWithGradesObj();
    this.calculateAttendancePercent();
    this.calculatePerformancePercent();
  }


  public async calculateTotalGrades () {
    this.isCalculatingTotal = true;
    await this.teachesService.calculateTotalGrades(this.teachesId);
    await this.loadTeaches();
    this.createStudentWithGradesObj();
    this.calculateAttendancePercent();
    this.calculatePerformancePercent();
    this.isCalculatingTotal = false;
  }


  protected async loadTeaches () {
    this.isLoadingTeaches = true;
    try {
      this.teaches = await this.teachesService.get(this.teachesId, [
        Teaches.EF_GROUP_STUDENTS, Teaches.EF_TEACHER, Teaches.EF_LESSONS_GRADES, Teaches.EF_SEMESTER
      ]);
    } catch (err) {
      console.log(err);

      if (err.status === 401 || err.status === 404) {
        this.alertService.error('Ошибка.', true);
        this.location.back();
      }

    } finally {
      this.isLoadingTeaches = false;
    }

    console.log(this.teaches);

    console.log(this.studentsWithGrades);
  }


  protected checkAccess () {
    return true;
  }


  protected createStudentWithGradesObj () {
    this.studentsWithGrades = [];

    this.teaches.group.students.forEach(student => {
      const grades = [];

      // Для каждого занятия находим соответствующую оценку или создаем пустую
      this.teaches.lessons.forEach(lesson => {
        let grade = lesson.grades.find((item) => {
          return item.userId === student.id;
        });

        if (!grade) {
          grade = new Grade({
            userId: student.id,
            lessonId: lesson.id,
          });
        }

        grade.lesson = lesson;
        grades.push(grade);
      });

      student.grades = grades;
      this.studentsWithGrades.push(student);
    });
  }


  protected calculateAttendancePercent () {
    let summGrades = 0;
    let attendGrades = 0;

    this.studentsWithGrades.forEach(student => {
      student.grades.forEach(grade => {
        if (!grade.id) return;

        summGrades++;
        if (grade.attendance > 0) {
          attendGrades++;
        }
      });
    });

    this.attendancePercent = Math.round(attendGrades / summGrades * 100);
  }


  protected calculatePerformancePercent () {
    let allGrades = 0;
    let performGrades = 0;

    this.studentsWithGrades.forEach(student => {
      student.grades.forEach(grade => {
        if (!grade.id) return;

        allGrades++;
        if (grade.value >= grade.lesson.minGradeValue) {
          performGrades++;
        }
      });
    });

    this.performancePercent = Math.round(performGrades / allGrades * 100);
  }


  protected isAllGradesExists (grades: Grade[]) {
    let result = true;
    grades.forEach(grade => {
      if (!grade.id)
        result = false;
    });

    return result;
  }

  protected getTotalLesson () {
    return this.teaches.lessons.find(lesson => lesson.type === Lesson.TYPE_TOTAL);
  }
}
