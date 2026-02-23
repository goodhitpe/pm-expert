# Draft002 개선 계획서

> **버전:** Draft002  
> **기준:** Draft001 검수 결과 (PMP 자격 보유 전문가 검토 + 40대 비전공 수강생 관점 평가)  
> **목표:** 아무것도 모르는 40대 수강생이 끝까지 따라갈 수 있는 강의자료

---

## 개선 우선순위 요약

| 우선순위 | 항목 | 작업량 | 상태 |
|---------|------|--------|------|
| 🔴 P1 | PM 약어 사전 신설 (Day 1 앞) | 신규 파일 1개 | ✅ 완료 |
| 🔴 P1 | Day 1 콘텐츠 분량 조정 (6교시 → 4교시 핵심만) | 기존 파일 수정 | ✅ 완료 |
| 🔴 P1 | 각 일차 시작에 복습 섹션 추가 (Day 2~16) | 15개 파일 수정 | ✅ 완료 |
| 🟡 P2 | 주요 개념 시각화 개선 (ASCII → 설명형 다이어그램) | 전 파일 점검 | ✅ 완료 |
| 🟡 P2 | 초반 실습 난이도 조절 (Day 1~3) | 3개 파일 수정 | ✅ 완료 |
| 🟡 P2 | Day 13 분량 분할 (10,209줄 → 2개 파일) | 파일 분리 | ✅ 완료 |
| 🟢 P3 | 슬라이드와 강의안 연동 표시 추가 | 전 파일 점검 | ✅ 완료 |
| 🟢 P3 | 각 일차별 "학습 전 체크리스트" 추가 | 16개 파일 수정 | ✅ 완료 |

---

## 상세 작업 계획

---

### [P1-1] PM 약어 사전 신설

**파일:** `summaries/pm-glossary.md` (신규 생성)

**배경:**  
PM 강의 파트(Day 1~11)에서 ITTO, WBS, EVM, SPI, CPI, EAC, ETC, VAC, TCPI, BAC, PV, EV, AC, CPM, PERT, RACI, RFP, RTM, CCB, PMO 등 약어가 설명 없이 등장. IT 용어 사전은 Day 12에 있지만 PM 약어 사전은 없음.

**작업 내용:**
- `summaries/pm-glossary.md` 파일 생성
- 약어 → 영문 풀네임 → 한국어 의미 → 처음 등장 일차 순으로 정리
- Day 전체에서 사용되는 50개 이상 PM 약어 포함
- `summaries/day01-orientation-detail.md` 상단에 "이 문서를 먼저 읽으세요" 안내 추가

**포함할 핵심 약어 목록:**

| 약어 | 영문 | 의미 | 등장 |
|------|------|------|------|
| PM | Project Manager | 프로젝트 관리자 | Day 1 |
| PMI | Project Management Institute | 프로젝트 관리 협회 | Day 1 |
| PMBOK | PM Body of Knowledge | PM 지식 체계 | Day 1 |
| PMP | PM Professional | PM 자격증 | Day 1 |
| WBS | Work Breakdown Structure | 작업 분해 구조 | Day 2 |
| ITTO | Input-Tools-Techniques-Output | 입력-도구/기법-출력 | Day 1 |
| EEF | Enterprise Environmental Factors | 기업 환경 요인 | Day 2 |
| OPA | Organizational Process Assets | 조직 프로세스 자산 | Day 2 |
| CCB | Change Control Board | 변경통제위원회 | Day 2 |
| PMO | Project Management Office | 프로젝트 관리 오피스 | Day 1 |
| RTM | Requirements Traceability Matrix | 요구사항 추적 매트릭스 | Day 3 |
| CPM | Critical Path Method | 주공정선법 | Day 4 |
| PERT | Program Evaluation & Review Technique | 프로그램 평가 검토 기법 | Day 4 |
| EVM | Earned Value Management | 획득가치 관리 | Day 5 |
| BAC | Budget At Completion | 완료시 예산 | Day 5 |
| PV | Planned Value | 계획가치 | Day 5 |
| EV | Earned Value | 획득가치 | Day 5 |
| AC | Actual Cost | 실제비용 | Day 5 |
| SV | Schedule Variance | 일정 편차 | Day 5 |
| CV | Cost Variance | 원가 편차 | Day 5 |
| SPI | Schedule Performance Index | 일정 성과 지수 | Day 5 |
| CPI | Cost Performance Index | 원가 성과 지수 | Day 5 |
| EAC | Estimate At Completion | 완료시 산정 | Day 5 |
| ETC | Estimate To Complete | 완료까지 산정 | Day 5 |
| VAC | Variance At Completion | 완료시 편차 | Day 5 |
| TCPI | To-Complete Performance Index | 완료 성과 지수 | Day 5 |
| QA | Quality Assurance | 품질 보증 | Day 6 |
| QC | Quality Control | 품질 통제 | Day 6 |
| RACI | Responsible/Accountable/Consulted/Informed | 책임 배정 행렬 | Day 7 |
| RFP | Request for Proposal | 제안요청서 | Day 10 |
| RFQ | Request for Quotation | 견적요청서 | Day 10 |
| FFP | Firm Fixed Price | 확정 고정가격 | Day 10 |
| T&M | Time and Material | 타임앤머티리얼 | Day 10 |
| EMV | Expected Monetary Value | 기대화폐가치 | Day 9 |

---

### [P1-2] Day 1 콘텐츠 분량 조정

**파일:** `summaries/day01-orientation-detail.md`

**배경:**  
Day 1이 6교시 구성으로 **프로젝트 정의 → Triple Constraint → 49개 프로세스 개요 → PMBOK 6판 vs 7판 → IT 기술 필요성 → 16일 커리큘럼 안내**까지 담고 있어 첫날부터 정보 과부하.

**작업 방향:**

| 현재 | 개선 후 |
|------|---------|
| 1교시: 프로젝트란? (1.5h) | 유지 |
| 2교시: Triple Constraint (1.5h) | 유지 (예시 1개로 축소) |
| 3교시: PM 프레임워크 개요 (1h) | **축소**: 5개 프로세스 그룹 + 10개 지식영역 개요만 |
| 4교시: PMBOK 6판 vs 7판 (2h) | **Day 2로 이동** — 연관성이 더 높은 통합관리 Day에 배치 |
| 5교시: PM이 IT 기술을 배워야 하는 이유 (1.5h) | **Day 16으로 이동** — 코스 마무리일에 동기부여 강화 |
| 6교시: 교육과정 안내 (1.5h) | 유지 (30분으로 압축) |

**기대 효과:** Day 1 총 분량 8시간 → 6시간 수준으로 조정, 수강생 소화 가능 밀도 유지

---

### [P1-3] 각 일차 시작 복습 섹션 추가 (Day 2~16)

**파일:** `summaries/day02~day16-*-detail.md` (15개 파일)

**배경:**  
40대 직장인 수강생은 하루 자고 나면 전날 내용을 상당 부분 망각. 에빙하우스 망각 곡선에 따르면 24시간 후 67% 망각. 각 일차 시작에 "지난 시간 핵심 3줄 요약 + 오늘 배울 내용 연결"이 필요.

**추가할 섹션 템플릿:**

```markdown
## 🔁 지난 시간 복습 (5분)

> **Day N-1 핵심 요점**
> 1. [전날 핵심 개념 1]
> 2. [전날 핵심 개념 2]  
> 3. [전날 핵심 개념 3]

**오늘과의 연결:**  
"지난 시간에 [A]를 배웠습니다. 오늘은 그것을 바탕으로 [B]를 배웁니다."

> 💡 **강사 안내:** 5분 동안 수강생 2~3명에게 전날 배운 내용을 물어보는 방식으로 진행
```

**파일별 복습 내용 (작성 필요):**

| 파일 | 복습 내용 |
|------|-----------|
| day02-integration | Day 1: 프로젝트 정의, 3대 특성, 5개 프로세스 그룹 |
| day03-scope | Day 2: 통합관리 7개 프로세스, 프로젝트 헌장, 변경통제 |
| day04-schedule | Day 3: WBS, 범위 기준선, RTM, 범위 크리프 |
| day05-cost | Day 4: CPM, 주공정, PERT 3점 산정, 간트차트 |
| day06-quality | Day 5: EVM 3대 변수(PV/EV/AC), SPI, CPI 공식 |
| day07-resource | Day 6: QA vs QC 차이, 7가지 품질 도구 |
| day08-communication | Day 7: RACI, 터크만 5단계, 갈등 해결 방식 |
| day09-risk | Day 8: 채널 공식 n(n-1)/2, 의사소통 계획서 |
| day10-procurement | Day 9: 리스크 4대 위협 전략, EMV, P-I 매트릭스 |
| day11-stakeholder | Day 10: 계약 유형(FFP/CPFF/T&M), Make or Buy |
| day12-sw-engineering | Day 11: 권력-관심도 매트릭스, 5개 참여 수준 |
| day13-network | Day 12: SDLC 6단계, 애자일 vs 워터폴, DevOps |
| day14-security | Day 13: OSI 7계층, TCP/IP, HTTP/HTTPS 동작 원리 |
| day15-database | Day 14: CIA 삼원칙, OWASP Top 10, 인증 vs 인가 |
| day16-new-tech | Day 15: ACID 4원칙, RDBMS vs NoSQL, 정규화 |

---

### [P2-1] 주요 개념 시각화 개선

**배경:**  
전체 강의안이 텍스트 위주. 핵심 프레임워크는 시각적으로 표현해야 40대 수강생이 기억하기 쉬움.

**작업 대상 (우선순위순):**

1. **Day 1 - 5개 프로세스 그룹 플로우**  
   착수 → 기획 → 실행 ↔ 감시/통제 → 종료 (화살표 순환 표현)

2. **Day 1 - 10개 지식 영역 × 5개 프로세스 그룹 매트릭스**  
   49개 프로세스 전체 지도 (표 형태로 시각화)

3. **Day 4 - CPM 네트워크 다이어그램**  
   ASCII 표현을 더 명확한 박스+화살표 형태로 개선

4. **Day 5 - EVM 그래프 개념도**  
   시간축 x, 비용축 y로 PV/EV/AC 3곡선 ASCII 표현

5. **Day 7 - 터크만 팀 발달 5단계**  
   Forming → Storming → Norming → Performing → Adjourning 직선 흐름도

6. **Day 9 - P-I 매트릭스 (확률-영향 매트릭스)**  
   2×2 표로 시각화 (현재 텍스트 설명만 있음)

7. **Day 11 - 권력-관심도 매트릭스**  
   4분면 ASCII 표

**표준 ASCII 다이어그램 예시 (EVM):**
```
비용
▲
│    PV (계획가치)
│   /
│  / CV(원가편차)
│ /─────── EV (획득가치)
│/   SV(일정편차)  \
│                   AC (실제비용)
└────────────────────▶ 시간
       현재 시점↑
```

---

### [P2-2] 초반 실습 난이도 조절 (Day 1~3)

**배경:**  
Day 1 첫 실습이 "소속 조직 업무 분석 → 프로젝트 3개/운영 3개 식별 → 3대 특성으로 설명"으로 개념을 막 배운 사람이 즉시 하기는 무거움.

**개선 방향:** 단답형 확인 → 적용 → 심화 3단계 구조

**Day 1 실습 재설계 예시:**

```markdown
### 실습 A (입문, 10분): 해당/비해당 분류
다음 중 "프로젝트"인 것에 O, "운영"인 것에 X를 표시하세요.
- ( ) 회사 홈페이지 신규 개발
- ( ) 매월 급여 명세서 발송
- ( ) 신입사원 연수 프로그램 기획
- ( ) 고객센터 전화 응대

### 실습 B (적용, 15분): 특성 분석
위에서 "프로젝트"로 분류한 것 1개를 골라
일시성/고유성/점진적 구체화 관점에서 설명해보세요.

### 실습 C (심화, 20분, 선택사항): 본인 업무 분석
본인 소속 조직의 실제 업무에서 프로젝트 2개, 운영 2개를 찾아보세요.
```

**Day 3 (범위관리) WBS 실습 재설계:**  
현재: "프로젝트 WBS를 4단계로 작성하라" → 너무 막막  
개선: 절반 완성된 WBS 제공 → 나머지 채우기 형태로 변경

---

### [P2-3] Day 13 분량 분할

**배경:**  
`day13-network-detail.md`가 10,209줄로 하루 강의 분량을 크게 초과. 실질적으로 2일치 콘텐츠.

**분할 계획:**

| 파일 | 내용 | 예상 분량 |
|------|------|----------|
| `day13-network-detail.md` | 1~4교시: 네트워크 기초, OSI 7계층, TCP/IP, HTTP | ~5,000줄 |
| `day13b-network-advanced-detail.md` | 5~8교시: 로드밸런서, DNS, CDN, 클라우드 네트워크, 실습 심화 | ~5,000줄 |

> **주의:** 커리큘럼 전체 일수는 16일로 유지. Day 13을 A/B로 분리하되 같은 날 진행하는 구조. 실제 일정 조정이 필요하다면 강사 판단으로 2일로 분리 가능.

---

### [P3-1] 슬라이드와 강의안 연동 표시

**배경:**  
`slides/` 폴더의 HTML 슬라이드와 `summaries/` 폴더의 강의안이 별도로 존재하지만 연동 표시가 없음. 강사가 "지금 이 부분이 슬라이드 몇 번째 페이지"인지 알기 어려움.

**작업 내용:**  
각 detail 파일의 교시 헤더 옆에 슬라이드 참조 태그 추가:
```markdown
## 2교시: Triple Constraint와 품질 <!-- 슬라이드 #12~#24 -->
```

---

### [P3-2] 학습 전 체크리스트 추가

**배경:**  
수강생이 각 일차 시작 전 "오늘 내가 무엇을 알게 될 것인가"를 미리 확인하면 학습 목표 의식이 높아짐.

**추가할 섹션 템플릿:**
```markdown
## ✅ 오늘 배우고 나면 할 수 있어요

- [ ] [학습목표 1]
- [ ] [학습목표 2]
- [ ] [학습목표 3]
- [ ] [학습목표 4]
- [ ] [학습목표 5]

> 수업 후 이 체크리스트를 다시 보며 스스로 확인해보세요.
```

---

## 작업 진행 방법

### 작업 순서 (권장)

```
1단계 (즉시): pm-glossary.md 신규 생성
2단계 (Day 2~16): 복습 섹션 15개 파일에 추가
3단계 (Day 1): 콘텐츠 분량 조정 + 학습 체크리스트
4단계 (Day 1~3): 실습 난이도 조절
5단계 (시각화): 핵심 7개 개념 다이어그램 추가
6단계 (Day 13): 파일 분할
7단계 (전체): 슬라이드 연동 표시
```

### 파일별 작업 현황 추적

| 파일 | P1-2(분량) | P1-3(복습) | P2-1(시각화) | P2-2(실습) | P3-2(체크리스트) |
|------|:---:|:---:|:---:|:---:|:---:|
| day01-orientation-detail | ✅ | — | ✅ | ✅ | ✅ |
| day02-integration-detail | — | ✅ | ✅ | ✅ | ✅ |
| day03-scope-detail | — | ✅ | ✅ | ✅ | ✅ |
| day04-schedule-detail | — | ✅ | ✅ | — | ✅ |
| day05-cost-detail | — | ✅ | ✅ | — | ✅ |
| day06-quality-detail | — | ✅ | — | — | ✅ |
| day07-resource-detail | — | ✅ | ✅ | — | ✅ |
| day08-communication-detail | — | ✅ | — | — | ✅ |
| day09-risk-detail | — | ✅ | ✅ | — | ✅ |
| day10-procurement-detail | — | ✅ | — | — | ✅ |
| day11-stakeholder-detail | — | ✅ | ✅ | — | ✅ |
| day12-sw-engineering-detail | — | ✅ | — | — | ✅ |
| day13-network-detail | — | ✅ | — | — | ✅ |
| day14-security-detail | — | ✅ | — | — | ✅ |
| day15-database-detail | — | ✅ | — | — | ✅ |
| day16-new-tech-detail | — | ✅ | — | — | ✅ |
| pm-glossary (신규) | ✅ | — | — | — | — |

> ⬜ = 미완료 / ✅ = 완료 / — = 해당없음

---

## 완료 기준

- [x] pm-glossary.md 생성 (50개 이상 약어)
- [x] Day 2~16 전체에 복습 섹션 추가
- [x] Day 1 분량 조정 완료
- [x] 핵심 7개 다이어그램 추가
- [x] Day 1~3 실습 난이도 재설계
- [x] Day 13 파일 분할
- [x] 전 파일 학습 체크리스트 추가
