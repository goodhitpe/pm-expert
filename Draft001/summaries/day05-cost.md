# Day 5: 프로젝트 원가 관리 (Project Cost Management)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 프로젝트 원가 관리 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 원가 산정/예산/통제 프로세스를 이해하고 EVM을 적용할 수 있다 |
| **선수학습** | Day 1-4 |

---

## 🎯 학습 목표

1. 주요 원가 산정 기법을 비교하고 상황에 맞는 기법을 선택할 수 있다
2. 프로젝트 예산을 구성하고 S-Curve를 이해할 수 있다
3. EVM(획득가치 관리)의 핵심 지표(PV, EV, AC, SPI, CPI)를 계산할 수 있다
4. EVM 지표를 통해 프로젝트 상태를 진단하고 완료 시 예측(EAC)을 산출할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: 원가 관리 개요 (1시간)
- **원가 관리의 4개 프로세스**
  1. 원가 관리 계획 수립
  2. 원가 산정
  3. 예산 수립
  4. 원가 통제
- **원가의 유형**
  - 직접비(Direct Cost) vs 간접비(Indirect Cost)
  - 고정비(Fixed Cost) vs 변동비(Variable Cost)
  - 매몰비용(Sunk Cost): 이미 지출된 회수 불가능한 비용
  - 기회비용(Opportunity Cost): 선택하지 않은 대안의 가치
- **생애주기 원가(Life Cycle Cost)**: 개발 + 운영 + 유지보수 + 폐기 전체 비용

#### 2교시: 원가 산정 기법 (1.5시간)
- **유사 산정(Analogous/Top-down)**
  - 과거 유사 프로젝트의 실적 기반
  - 빠르지만 정확도 낮음 (초기 단계에서 활용)
- **모수 산정(Parametric)**
  - 통계적 관계 활용 (예: 단가 × 수량)
  - 과거 데이터의 품질에 좌우됨
- **상향식 산정(Bottom-up)**
  - 개별 활동/작업 패키지 수준에서 산정 후 합산
  - 가장 정확하나 시간/노력이 많이 소요
- **3점 산정(Three-point)**
  - 낙관(O), 최빈(M), 비관(P)
  - 삼각분포: (O + M + P) / 3
  - 베타분포: (O + 4M + P) / 6
- **산정 정확도 등급**
  - ROM(Rough Order of Magnitude): -25% ~ +75%
  - 예산 산정(Budget Estimate): -10% ~ +25%
  - 확정 산정(Definitive Estimate): -5% ~ +10%

#### 3교시: 예산 수립 (1.5시간)
- **프로젝트 예산 구조**
  - 활동별 원가 산정 합계
  - (+) 우발 사태 예비(Contingency Reserve) → **원가 기준선(Cost Baseline)**
  - (+) 관리 예비(Management Reserve) → **프로젝트 예산(Project Budget)**
- **원가 기준선(Cost Baseline)**
  - 시간 배분된 승인 예산
  - 성과 측정의 기준
- **S-Curve**: 누적 지출을 시간 대비 그래프로 표현
- **자금 조달 한도(Funding Limit)**: 조직의 기간별 지출 한도와 조정

### 오후 세션 (4시간)

#### 4교시: 원가 통제 및 EVM 개요 (1시간)
- **원가 통제**: 원가 기준선 대비 실적 모니터링 및 변경 관리
- **EVM(Earned Value Management) 개요**
  - 범위, 일정, 원가를 통합하여 프로젝트 성과를 객관적으로 측정
  - 세 가지 핵심 변수
    - **PV(Planned Value, 계획가치)**: 현 시점까지 계획된 작업의 예산
    - **EV(Earned Value, 획득가치)**: 현 시점까지 실제 완료한 작업의 예산 가치
    - **AC(Actual Cost, 실제원가)**: 현 시점까지 실제 지출한 비용

#### 5교시: EVM 심화 (2시간)
- **성과 지표**
  - **SV(Schedule Variance, 일정 차이)** = EV - PV
    - SV > 0: 일정 앞섬 / SV < 0: 일정 지연
  - **CV(Cost Variance, 원가 차이)** = EV - AC
    - CV > 0: 예산 절감 / CV < 0: 예산 초과
  - **SPI(Schedule Performance Index)** = EV / PV
    - SPI > 1: 일정 앞섬 / SPI < 1: 일정 지연
  - **CPI(Cost Performance Index)** = EV / AC
    - CPI > 1: 예산 절감 / CPI < 1: 예산 초과
- **완료 시 예측(Forecasting)**
  - **EAC(Estimate at Completion, 완료 시 산정치)**
    - EAC = BAC / CPI (현재 추세 지속 시)
    - EAC = AC + (BAC - EV) (비전형적 차이 시)
    - EAC = AC + (BAC - EV) / (CPI × SPI) (복합 지표)
  - **ETC(Estimate to Complete)** = EAC - AC
  - **VAC(Variance at Completion)** = BAC - EAC
  - **TCPI(To-Complete Performance Index)** = (BAC - EV) / (BAC - AC)
- **EVM 그래프 해석**: PV, EV, AC 커브를 통한 프로젝트 상태 진단

#### 6교시: 🔨 실습 - EVM 계산 (1시간)
- **실습 시나리오**
  - BAC = 10억원, 6개월 프로젝트, 현재 3개월차
  - PV = 5억, EV = 4억, AC = 6억
  - SV, CV, SPI, CPI, EAC, ETC, VAC 계산
  - 프로젝트 상태 진단 보고서 작성
- 팀별 결과 공유 및 토론

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| EVM | 획득가치 관리, 범위/일정/원가 통합 성과 측정 |
| PV, EV, AC | 계획가치, 획득가치, 실제원가 |
| SPI, CPI | 일정 성과 지수, 원가 성과 지수 |
| EAC | 완료 시 산정치 (최종 예상 비용) |
| 원가 기준선 | 시간 배분된 승인 예산 (우발 예비 포함) |
| 매몰비용 | 이미 지출되어 회수 불가능한 비용 |

---

## ✅ 학습 확인 질문

1. 직접비와 간접비의 차이를 IT 프로젝트 사례로 설명하시오.
2. 매몰비용(Sunk Cost)이 프로젝트 의사결정에 영향을 미치면 안 되는 이유를 설명하시오.
3. EVM에서 SPI=0.8, CPI=0.9일 때 프로젝트 상태를 해석하시오.
4. BAC=20억, EV=8억, AC=10억일 때 EAC를 3가지 공식으로 각각 계산하시오.
