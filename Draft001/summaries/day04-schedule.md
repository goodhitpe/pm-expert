# Day 4: 프로젝트 일정 관리 (Project Schedule Management)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 프로젝트 일정 관리 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 일정 관리 프로세스를 이해하고 CPM과 간트차트를 작성할 수 있다 |
| **선수학습** | Day 1-3 (특히 WBS) |

---

## 🎯 학습 목표

1. 활동 정의, 순서 배열, 기간 산정 프로세스를 수행할 수 있다
2. 주공정법(CPM)을 이용해 주공정(Critical Path)을 식별할 수 있다
3. 간트차트를 읽고 작성할 수 있다
4. 일정 단축 기법(Crashing, Fast-tracking)을 이해하고 적용 시점을 판단할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: 일정 관리 개요 및 활동 정의 (1시간)
- **일정 관리의 6개 프로세스**
  1. 일정 관리 계획 수립
  2. 활동 정의
  3. 활동 순서 배열
  4. 활동 기간 산정
  5. 일정 개발
  6. 일정 통제
- **활동 정의(Define Activities)**
  - WBS의 작업 패키지를 더 세부적인 활동(Activity)으로 분해
  - 활동 목록(Activity List) 작성
  - 마일스톤 목록(Milestone List) 작성
  - 마일스톤(Milestone): 기간이 0인 중요 시점

#### 2교시: 활동 순서 배열 (1.5시간)
- **선후행 관계 유형 (PDM: Precedence Diagramming Method)**
  - FS (Finish-to-Start): 선행 완료 → 후행 시작 (가장 일반적)
  - FF (Finish-to-Finish): 선행 완료 → 후행 완료
  - SS (Start-to-Start): 선행 시작 → 후행 시작
  - SF (Start-to-Finish): 선행 시작 → 후행 완료 (가장 드묾)
- **의존성(Dependency) 유형**
  - 강제적 의존성(Mandatory/Hard Logic)
  - 임의적 의존성(Discretionary/Soft Logic/Preferred Logic)
  - 외부 의존성(External)
  - 내부 의존성(Internal)
- **리드(Lead)와 래그(Lag)**
  - 리드: 후행 활동을 앞당기는 시간 (음의 값)
  - 래그: 후행 활동을 늦추는 대기 시간 (양의 값)
- **네트워크 다이어그램 작성**: AON(Activity on Node) 기법

#### 3교시: 활동 기간 산정 (1.5시간)
- **기간 산정 기법**
  - 유사 산정(Analogous Estimating): 과거 유사 프로젝트 기반
  - 모수 산정(Parametric Estimating): 통계적 관계 기반 (예: LOC × 단가)
  - 3점 산정(Three-point Estimating)
    - 삼각분포: (낙관 + 최빈 + 비관) / 3
    - 베타분포(PERT): (낙관 + 4×최빈 + 비관) / 6
    - 표준편차: (비관 - 낙관) / 6
  - 상향식 산정(Bottom-up Estimating): 가장 정확, 가장 시간 소요
- **산정 정확도**: ROM(-25%~+75%) → Budget(-10%~+25%) → Definitive(-5%~+10%)
- **예비 분석(Reserve Analysis)**
  - 우발 사태 예비(Contingency Reserve): 알려진 리스크 대비
  - 관리 예비(Management Reserve): 알려지지 않은 리스크 대비

### 오후 세션 (4시간)

#### 4교시: 일정 개발 - CPM (2시간)
- **주공정법(CPM: Critical Path Method)**
  - 주공정(Critical Path): 프로젝트를 완료하기까지 가장 긴 경로
  - 총 여유(Total Float/Slack): 전체 프로젝트 지연 없이 지연 가능한 시간
  - 자유 여유(Free Float): 바로 다음 활동에 영향 없이 지연 가능한 시간
- **전진 계산(Forward Pass)**: ES(Early Start), EF(Early Finish) 계산
- **후진 계산(Backward Pass)**: LS(Late Start), LF(Late Finish) 계산
- **여유 시간 계산**: Total Float = LS - ES = LF - EF
- **CPM 계산 실습** (예제 포함)
  - 네트워크 다이어그램에서 주공정 식별
  - 각 활동의 ES, EF, LS, LF, TF 계산
- **PERT(Program Evaluation and Review Technique)**
  - 확률적 접근법, CPM과의 차이

#### 5교시: 간트차트 및 일정 단축 기법 (1시간)
- **간트차트(Gantt Chart)**
  - 막대그래프 기반 일정 표현
  - 일정 기준선 vs 실제 진행 비교
  - 마일스톤 표시
- **일정 단축 기법**
  - **공정 압축(Crashing)**: 자원 추가 투입으로 기간 단축
    - 비용 증가 수반
    - 주공정 활동에만 적용 의미 있음
    - 비용 기울기(Cost Slope) 분석: (단축비용 - 정상비용) / (정상기간 - 단축기간)
  - **빠른 추적(Fast-Tracking)**: 순차적 활동을 병행 수행
    - 재작업 리스크 증가
    - FS 관계를 SS 관계로 전환
- **자원 최적화 기법**
  - 자원 평준화(Resource Leveling): 자원 과부하 해소 → 일정 연장 가능
  - 자원 평활화(Resource Smoothing): 여유 시간 내에서 자원 조정

#### 6교시: 🔨 실습 - 간트차트 및 CPM (1시간)
- **실습 과제**
  - 주어진 활동 목록과 의존관계로 네트워크 다이어그램 작성
  - CPM 계산 (ES, EF, LS, LF, TF)
  - 주공정 식별
  - 간트차트 작성
  - 일정 1주 단축이 필요한 경우 Crashing vs Fast-tracking 의사결정

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| CPM | 주공정법, 가장 긴 경로(Critical Path) 식별 |
| Critical Path | 총 여유가 0인 경로, 프로젝트 최소 기간 결정 |
| Total Float | 프로젝트 지연 없이 활동을 지연시킬 수 있는 시간 |
| Crashing | 자원 추가 투입으로 주공정 활동 기간 단축 |
| Fast-tracking | 순차적 활동의 병행 수행 |
| PERT | 3점 산정 기반 확률적 일정 기법 |
| 간트차트 | 막대그래프 형태의 일정 시각화 도구 |

---

## ✅ 학습 확인 질문

1. FS, FF, SS, SF 의존관계 유형을 각각 예시와 함께 설명하시오.
2. CPM에서 Total Float가 0인 활동은 어떤 의미를 가지는가?
3. Crashing과 Fast-tracking의 차이, 각각의 장단점을 설명하시오.
4. PERT 3점 산정에서 베타분포 공식을 적용하여 기간을 계산하시오. (낙관=4일, 최빈=6일, 비관=14일)
