# Day 16: 신기술 (Emerging Technologies)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 신기술 트렌드 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 최신 IT 기술 트렌드를 이해하고 PM 관점에서 전략적 활용 방안을 파악한다 |
| **선수학습** | Day 1-15 |

---

## 🎯 학습 목표

1. AI/ML, 클라우드, 블록체인 등 주요 신기술의 핵심 개념을 설명할 수 있다
2. 각 기술의 비즈니스 활용 사례를 이해하고 프로젝트 적용 가능성을 판단할 수 있다
3. 기술 트렌드가 IT 프로젝트 관리에 미치는 영향을 설명할 수 있다
4. 전체 교육 과정을 종합 정리하고 PM으로서의 역할을 재정립할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: AI / 머신러닝 (1.5시간)
- **인공지능(AI)의 개요**
  - 약한 AI(Narrow AI) vs 강한 AI(General AI)
  - AI의 발전 단계 (규칙 기반 → 머신러닝 → 딥러닝 → 생성형 AI)
- **머신러닝(ML) 기본 개념**
  - 지도학습(Supervised): 분류, 회귀 (라벨이 있는 데이터)
  - 비지도학습(Unsupervised): 군집화, 차원 축소 (라벨 없는 데이터)
  - 강화학습(Reinforcement): 보상 기반 학습 (게임, 로봇)
- **딥러닝(Deep Learning)**
  - 인공신경망(Neural Network) 개요
  - CNN(합성곱 신경망): 이미지 인식
  - RNN/LSTM: 자연어 처리, 시계열
  - Transformer: GPT, BERT의 기반 구조
- **생성형 AI(Generative AI)**
  - ChatGPT, Claude, Gemini 등 LLM(Large Language Model)
  - 이미지 생성 (DALL-E, Midjourney, Stable Diffusion)
  - 업무 활용: 코드 생성, 문서 작성, 번역, 요약
- **AI 프로젝트의 주요 고려사항 (PM 관점)**
  - 데이터 품질 및 양 확보
  - 모델 성능 지표 (정확도, 재현율, F1 Score)
  - 윤리적 고려 (편향, 공정성, 설명 가능성)
  - MLOps (ML 모델 운영/관리)

#### 2교시: 클라우드 컴퓨팅 (1.5시간)
- **클라우드 컴퓨팅 심화**
  - 주요 클라우드 플랫폼: AWS, Azure, GCP
  - 핵심 서비스 분류
    - 컴퓨팅: EC2, Lambda(서버리스), 컨테이너(ECS, EKS)
    - 스토리지: S3, EBS, Glacier
    - 데이터베이스: RDS, DynamoDB, Aurora
    - 네트워킹: VPC, CloudFront(CDN), Route53
- **컨테이너와 쿠버네티스**
  - Docker: 애플리케이션 컨테이너화
  - Kubernetes(K8s): 컨테이너 오케스트레이션
  - 마이크로서비스 아키텍처와의 관계
- **서버리스(Serverless)**
  - FaaS(Function as a Service): AWS Lambda, Azure Functions
  - 이벤트 기반 아키텍처
  - 장점: 운영 부담 최소화, 사용량 기반 과금
- **클라우드 마이그레이션 전략 (PM 관점)**
  - 6R 전략: Rehost, Replatform, Repurchase, Refactor, Retire, Retain
  - 마이그레이션 계획 수립 및 리스크 관리
  - 비용 최적화 (Reserved, Spot, On-Demand)

#### 3교시: 빅데이터 (1시간)
- **빅데이터의 정의 (5V)**
  - Volume(규모): 대용량 데이터
  - Velocity(속도): 실시간 생성/처리
  - Variety(다양성): 정형/반정형/비정형
  - Veracity(정확성): 데이터 신뢰도
  - Value(가치): 비즈니스 가치 도출
- **빅데이터 기술 스택**
  - 수집: Kafka, Flume, Sqoop
  - 저장: HDFS, S3, Data Lake
  - 처리: Hadoop MapReduce, Spark
  - 분석: Spark SQL, Hive, Presto
  - 시각화: Tableau, Power BI, Grafana
- **데이터 분석 프로세스**
  - 문제 정의 → 데이터 수집 → 전처리 → 분석/모델링 → 시각화 → 의사결정
- **빅데이터 프로젝트에서 PM의 역할**
  - 데이터 소스 확보 및 품질 관리
  - 분석 목표와 비즈니스 가치 명확화
  - 데이터 거버넌스 및 보안 체계

### 오후 세션 (4시간)

#### 4교시: 블록체인 & IoT (1시간)
- **블록체인(Blockchain)**
  - 분산 원장 기술 (Distributed Ledger)
  - 블록 구조: 이전 해시 + 트랜잭션 데이터 + 현재 해시
  - 합의 알고리즘: PoW, PoS, PBFT
  - 퍼블릭 / 프라이빗 / 컨소시엄 블록체인
  - 스마트 컨트랙트(Smart Contract)
  - 활용 사례: 금융, 공급망, 디지털 인증, NFT
- **IoT(Internet of Things, 사물인터넷)**
  - 센서 → 네트워크 → 플랫폼 → 서비스 아키텍처
  - 통신 프로토콜: MQTT, CoAP, BLE
  - 엣지 컴퓨팅(Edge Computing): 데이터를 발생 지점에서 처리
  - 활용 사례: 스마트 팩토리, 스마트 시티, 자율주행, 헬스케어
  - IoT 프로젝트 리스크: 보안 취약점, 호환성, 데이터 처리량

#### 5교시: DevOps & 로우코드 & 디지털 트랜스포메이션 (1.5시간)
- **DevOps**
  - Development + Operations 결합
  - CI/CD(지속적 통합/배포) 파이프라인
    - CI: 코드 통합 → 빌드 → 테스트 자동화
    - CD: 테스팅 → 스테이징 → 프로덕션 자동 배포
  - DevOps 도구 체인: Git, Jenkins, Docker, Kubernetes, Terraform
  - DevSecOps: 보안을 DevOps에 통합
  - PM 관점: 빠른 배포 주기 관리, 자동화 효과 측정
- **로우코드/노코드(Low-code/No-code)**
  - 시민 개발자(Citizen Developer) 등장
  - 주요 플랫폼: OutSystems, Mendix, Power Apps, AppSheet
  - 장점: 개발 속도, 비용 절감, 비개발자 참여
  - 한계: 복잡한 기능 한계, 벤더 종속성, 확장성
  - PM 관점: 프로토타이핑, 간단한 앱 개발에 활용
- **디지털 트랜스포메이션(DX)**
  - DX의 정의와 핵심 요소
  - 기술 도입 vs 비즈니스 모델 변혁
  - DX 추진 전략: 리더십, 문화, 기술, 데이터
  - PM이 DX 프로젝트를 이끄는 역할

#### 6교시: 전체 과정 종합 정리 및 수료 (1.5시간)
- **16일 교육과정 전체 복습**
  - 프로젝트 관리 10대 지식영역 핵심 정리
  - IT 기술 5개 과목 핵심 정리
- **PM으로서의 역할 재정립**
  - 기술 이해를 바탕으로 한 효과적 프로젝트 관리
  - 비즈니스-IT 브릿지 역할
  - 지속적 학습의 중요성
- **향후 학습 로드맵 제안**
  - PMP 자격증 준비
  - CAPM 자격증 (입문)
  - 애자일 관련 자격증 (PSM, CSM, SAFe)
  - ITIL (IT 서비스 관리)
  - 클라우드 자격증 (AWS SAA, Azure AZ-900)
- **교육 만족도 조사 및 피드백**
- **수료식 및 과정 마무리**

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| 생성형 AI | LLM 기반 텍스트/이미지/코드 생성 기술 |
| 서버리스 | 서버 관리 없이 함수 단위로 실행 |
| 빅데이터 5V | Volume, Velocity, Variety, Veracity, Value |
| 블록체인 | 분산 원장 기반 위변조 방지 기술 |
| IoT | 사물인터넷, 센서 기반 실시간 데이터 수집 |
| CI/CD | 지속적 통합/배포 자동화 |
| DX | 디지털 트랜스포메이션 |
| 양자 켈퓨팅 | 큐비트·양자 중첩저·PQC(NIST 표준화); PM의 크립토 전환 유념기간 계획 |

---

## ✅ 학습 확인 질문

1. 머신러닝의 지도학습, 비지도학습, 강화학습의 차이를 각각 예시와 함께 설명하시오.
2. 클라우드 마이그레이션 6R 전략을 각각 설명하시오.
3. DevOps에서 CI/CD 파이프라인의 각 단계를 설명하시오.
4. PM으로서 AI 프로젝트를 관리할 때 가장 유의해야 할 리스크 3가지를 설명하시오.
5. (심화) 양자 콨퓨팅에서 PM이 지금부터 준비해야 할 리스크는 무엇이며, 크립토 앱똥스피 툡아 즉파(Y2Q)에 PM이 어떻게 대비해야 하는가?
