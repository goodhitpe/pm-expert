# Day 17 슬라이드 생성 보고서 — 애자일/스크럼 & PM 도구

## 1. 생성 파일 정보

| 항목 | 내용 |
|------|------|
| **슬라이드 파일** | `Draft004/slides/day17-agile-tools-slide.html` |
| **소스 파일** | `Draft004/summaries/day17-agile-tools.md` |
| **총 슬라이드 수** | 18장 |
| **생성 일시** | 2025년 (Day17 최종 배치 생성) |

---

## 2. 슬라이드 구성 목록

| # | 슬라이드 제목 | 유형 | 사용 CSS 클래스 |
|---|------|------|----------------|
| 1 | Day 17: 애자일/스크럼 & PM 도구 | `.title-slide` | `.day-badge`, `.title-meta` |
| 2 | 학습 목표 (4 카드) | 학습 목표 | `.card-grid` |
| 3 | 오늘의 흐름 — 7교시 | 플로우 | `.diagram`, `.step`, `.arrow` |
| 4 | [1교시] Section | `.section-slide` | `.section-num` |
| 5 | 애자일 선언문 4가지 핵심 가치 | 이론 | `.comparison`, `.vs-col`, `.info-box.gold` |
| 6 | [2교시] Section | `.section-slide` | `.section-num` |
| 7 | 스크럼 3역할 & 3산출물 | 이론 | `.two-col`, `.card-grid`, `.table-wrapper` |
| 8 | 스크럼 5이벤트 (Sprint Cycle) | 이론 | `.diagram`, `.two-col`, `.info-box.gold` |
| 9 | [3교시] Section | `.section-slide` | `.section-num` |
| 10 | 칸반 & 방법론 3종 비교 | 이론 | `.two-col`, `.table-wrapper`, `.info-box.warning` |
| 11 | [5~6교시] Section | `.section-slide` | `.section-num` |
| 12 | Jira — 핵심 개념 & 보고서 | 실무 | `.two-col`, `.table-wrapper`, `.info-box.gold` |
| 13 | MS Project & Trello & 도구 선택 | 실무 | `.two-col`, `.table-wrapper`, `.info-box.gold` |
| 14 | [전체 총정리] Section | `.section-slide` | `.section-num` |
| 15 | 17일 과정 전체 복습표 | 총정리 | `.table-wrapper` (17행 테이블) |
| 16 | Day 17 핵심 키워드 (25개) | 요약 | `.keyword-tags` |
| 17 | 학습 확인 퀴즈 (Q1~Q3) | 퀴즈 | `.quiz-box`, `<details>` |
| 18 | 수료 & 향후 학습 로드맵 | 마무리 | `.card-grid`, `.info-box.gold` |

---

## 3. 소스 파일 커버리지 분석

### 3-1. 포함된 내용

#### 1교시: 애자일 개요 & 선언문
✅ 애자일 정의 (불확실성·변화에 적응) (Slide 5)  
✅ 애자일 선언문 4가지 핵심 가치 comparison 형식 (Slide 5)  
✅ 12가지 원칙 핵심 요약 (info-box.gold) (Slide 5)  
✅ 애자일 방법론 종류 언급 (스크럼/칸반/XP/린/SAFe) (Slide 10)  

#### 2교시: 스크럼 프레임워크
✅ 3역할 (PO/SM/개발팀) 각 역할 설명 — 카드 형식 (Slide 7)  
✅ 3산출물 (제품백로그/스프린트백로그/증분) — 책임자 포함 표 (Slide 7)  
✅ DoD (완료 정의) 개념 (Slide 7)  
✅ 사용자 스토리 형식 + INVEST 기준 (Slide 7)  
✅ 5이벤트 전체 + 타임박스 시간 (Slide 8)  
✅ 스토리 포인트 + 피보나치 수열 (Slide 8)  
✅ 번다운 차트 + 벨로시티 (Slide 8)  

#### 3교시: 칸반 & 하이브리드
✅ 칸반 보드 컬럼 구조 5단계 (Slide 10)  
✅ WIP 제한 — 목적과 효과 (Slide 10)  
✅ 리드타임 vs 사이클타임 (Slide 10)  
✅ 워터폴 vs 스크럼 vs 칸반 6개 항목 비교표 (Slide 10)  
✅ 하이브리드 (Water-Scrum-Fall) 패턴 (Slide 10)  
✅ SAFe 소개 (Slide 10)  

#### 5~6교시: PM 도구
✅ Jira 핵심 개념 5종 (Issue/Board/Backlog/Sprint/Workflow) (Slide 12)  
✅ JQL 기초 예시 코드 (Slide 12)  
✅ Jira 보고서 4종 (번다운/번업/속도/스프린트) (Slide 12)  
✅ Jira 실습 순서 6단계 (Slide 12)  
✅ MS Project 핵심 기능 5종 (간트/CPM/자원/기준선/EVM) (Slide 13)  
✅ Trello 구조 + Power-Up + 활용 영역 (Slide 13)  
✅ 도구 선택 가이드 4종 (Jira/MS Project/Trello/하이브리드) (Slide 13)  

#### 총정리
✅ 17일 과정 전체 복습표 (Day01~Day17 완전 포함) (Slide 15)  
✅ 향후 학습 로드맵 (PMP/CAPM/PSM/CSM/SAFe/ITIL/AWS SAA) (Slide 18)  

---

### 3-2. 보완 자료로 해결된 항목

| 미포함 항목 | 이유 |
|------------|------|
| Day12 스크럼 상세 부분 중복 | Day12에서 스크럼 3역할/5이벤트 이미 커버 (유지) |
| XP (익스트림 프로그래밍) 상세 | ✅ 보완 자료 B-1 (XP 5관행·Jira/Azure DevOps 연계 도구 완성) |
| 스프린트 벨로시티 계산 방법 | ✅ 보완 자료 B-2 (3스프린트 계산 예제·릴리즈 계획 활용 완성) |
| 회고 포맷 (4L/3S/항해도) | ✅ 보완 자료 B-3 (4L 포맷·기타 회고 방법 완성) |

---

## 4. 시각화 요소

| 요소 | 위치 | 설명 |
|------|------|------|
| 애자일 선언문 comparison | Slide 5 | 덜 중요←→더 중요 좌우 분할 |
| 스크럼 3역할 카드 | Slide 7 | PO(금)/SM(보라)/개발팀(기본) 색상 차별화 |
| 스프린트 5이벤트 diagram | Slide 8 | 순환 흐름 step 배치, 각 이벤트 타임박스 포함 |
| 방법론 3종 비교표 | Slide 10 | 워터폴/스크럼/칸반 6항목 대비 |
| 17일 총복습표 | Slide 15 | Day01~Day17 17행 색상 교차 테이블 |

---

## 5. 타 Day와의 연계 지점

| 연계 슬라이드 | 연결 Day | 연계 내용 |
|------|------|------|
| Slide 8 번다운 차트 | Day 04 | 일정 관리·간트 차트와 대비되는 애자일 추적 방식 |
| Slide 13 MS Project EVM | Day 05 | CPI/SPI/EAC 보고서 생성 (원가관리 Tool) |
| Slide 13 도구 선택 가이드 | Day 02 | 통합 관리 계획서에 PM 도구 명시 |
| Slide 10 SAFe | Day 07 | 대규모 조직의 자원·팀 관리 확장 |
| Slide 5 애자일 4가치 | Day 12 | SW공학 Day12 애자일 심화 연계 |
| Slide 15 전체 복습표 | Day 01~16 | 전체 과정 통합 연결 가이드 |

---

## 6. 시험 출제 포인트

### HIGH 빈도 예상

1. **애자일 선언문 4가지 가치** — 각 가치 쌍 (무엇 over 무엇) 암기
2. **스크럼 3역할·5이벤트·3산출물** — 전체 목록 나열 + 각 역할 책임
3. **PO vs SM 차이** — "무엇(PO)" vs "어떻게(SM)", 관리자와의 차이
4. **번다운 차트 vs 번업 차트** — X/Y축 정의와 독해 방법
5. **WIP 제한 목적** — 병목 방지, 리드타임 단축, 집중도 향상

### MEDIUM 빈도 예상

6. **INVEST 기준** — 사용자 스토리 품질 평가 6기준
7. **칸반 vs 스크럼** — 인도 주기(연속 vs 스프린트), 변경 대응 차이
8. **PM 도구 선택 기준** — 상황별 Jira/MS Project/Trello 적합성
9. **DoD (완료 정의)** — 증분(Increment)의 출시 가능 기준
10. **벨로시티** — 계획 수립 및 예측에 사용하는 팀 속도 지표

### PM 실무 연결

11. EVM(CPI/SPI) + MS Project 기준선 → 진척도 추적 통합
12. Jira JQL을 통한 이해관계자별 맞춤 보고서 생성
13. 하이브리드 방법론 선택 — 조직 전환기 PM 의사결정 기준

---

## 7. 전체 17일 과정 완료 현황

| 구분 | Days | 상태 |
|------|------|------|
| PM 지식영역 | Day01~Day11 | ✅ 모두 완료 |
| IT 기술 과목 | Day12~Day16 | ✅ 모두 완료 |
| 실습·총정리 | Day17 | ✅ 완료 (최종) |
| **전체** | **Day01~Day17** | **✅ 34파일 (슬라이드 17 + 보고서 17) 완성** |


---

## 보완 자료 (슬라이드 미포함 핵심 내용)

### B-1. XP 5대 관행 — 애자일 도구 실무 연계

| XP 관행 | 설명 | Jira/Azure DevOps 연계 도구 |
|--------|------|--------------------------|
| 페어 프로그래밍 | 2인 동시 코딩, Navigator + Driver 역할 분리 | VS Code Live Share, GitHub Codespaces |
| TDD | 테스트 먼저 → 구현 → 리팩토링 (Red-Green-Refactor) | JUnit/pytest, GitHub Actions CI |
| CI (지속적 통합) | 하루 수회 main 브랜치 병합, 자동 빌드·테스트 | Jenkins, GitHub Actions, GitLab CI |
| 소규모 릴리즈 | 2주 이하 스프린트, 잦은 배포 | Jira Sprint Board, Azure Release Pipelines |
| 리팩토링 | 기능 변경 없이 코드 구조 개선 | SonarQube 기술부채 측정 |

---

### B-2. 스프린트 벨로시티 — 계산 및 활용

**벨로시티 계산**:
```
벨로시티 = 스프린트에서 완료된 스토리 포인트 합계
```

| 스프린트 | 계획 SP | 완료 SP | 비고 |
|---------|--------|--------|------|
| Sprint 1 | 30 | 22 | 팀 초기 적응 |
| Sprint 2 | 28 | 26 | 안정화 |
| Sprint 3 | 30 | 29 | 정상 궤도 |
| **평균 벨로시티** | - | **25.7** | 3스프린트 평균 |

**활용**:
- 릴리즈 계획: 총 남은 SP ÷ 벨로시티 = 예상 스프린트 수
- 예: 잔여 SP 200 ÷ 벨로시티 25 = **8 스프린트 (= 4개월)** 예측

---

### B-3. 회고 (Retrospective) 4L 포맷

| L | 항목 | 질문 | 예시 |
|---|------|------|------|
| **L**iked | 좋았던 것 | "이번 스프린트에서 잘 된 것은?" | 일일 스탠드업이 15분 이내 유지됨 |
| **L**earned | 배운 것 | "새롭게 알게 된 것은?" | Canary 배포 전략 처음 적용 |
| **L**acked | 부족했던 것 | "무엇이 부족했나?" | DoD(완료 정의) 기준 불명확 |
| **L**onged For | 원했던 것 | "다음에 갖추고 싶은 것은?" | 자동화 테스트 커버리지 80% 이상 |

> **기타 회고 포맷**: Start/Stop/Continue, Mad/Sad/Glad, 항해도(Sailboat) 기법

---

### B-4. 애자일 스케일링 프레임워크 비교 — SAFe/LeSS/Nexus

| 프레임워크 | 설명 | 팀 수 | 특징 |
|----------|------|------|------|
| SAFe (Scaled Agile Framework) | 기업급 애자일 + PI Planning | 50~125명 | 계층 구조, 엔터프라이즈 친화 |
| LeSS (Large Scale Scrum) | 단순화된 Scrum 확장 | 2~8팀 | 단일 Product Backlog, 단순성 강조 |
| Nexus | Scrum.org 공식 스케일링 | 3~9팀 | Nexus Integration Team 추가 |
| Spotify Model | 스쿼드·트라이브·챕터·길드 | 유연 | 자율적 조직 문화, 비공식 프레임워크 |

> **PMP 시험 포인트**: 어떤 프레임워크가 우월한지 묻지 않음 — 상황에 맞는 선택(테일러링)이 핵심
