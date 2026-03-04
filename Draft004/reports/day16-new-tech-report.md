# Day 16 슬라이드 생성 보고서 — 신기술 트렌드

## 1. 생성 파일 정보

| 항목 | 내용 |
|------|------|
| **슬라이드 파일** | `Draft004/slides/day16-new-tech-slide.html` |
| **소스 파일** | `Draft004/summaries/day16-new-tech.md` |
| **총 슬라이드 수** | 19장 |
| **생성 일시** | 2025년 (Day16 배치 생성) |

---

## 2. 슬라이드 구성 목록

| # | 슬라이드 제목 | 유형 | 사용 CSS 클래스 |
|---|------|------|----------------|
| 1 | Day 16: 신기술 트렌드 | `.title-slide` | `.day-badge`, `.title-meta` |
| 2 | 학습 목표 (4 카드) | 학습 목표 | `.card-grid` |
| 3 | 오늘의 흐름 — 6교시 | 플로우 | `.diagram`, `.step`, `.arrow` |
| 4 | [1교시] Section | `.section-slide` | `.section-num` |
| 5 | AI 발전 단계 &amp; ML 3유형 | 이론 | `.two-col`, `.diagram`, `.table-wrapper` |
| 6 | 생성형 AI &amp; PM 관점 리스크 | 실무 | `.two-col`, `.info-box.warning`, `.info-box` |
| 7 | [2교시] Section | `.section-slide` | `.section-num` |
| 8 | 컨테이너 &amp; 서버리스 | 이론 | `.comparison`, `.vs-col`, `.info-box.gold` |
| 9 | 클라우드 마이그레이션 6R | 이론 | `.table-wrapper`, `.info-box` |
| 10 | [3교시] 빅데이터 Section | `.section-slide` | `.section-num` |
| 11 | 빅데이터 5V &amp; 기술 스택 | 이론 | `.two-col`, `.card-grid`, `.table-wrapper` |
| 12 | [4교시] Section | `.section-slide` | `.section-num` |
| 13 | 블록체인 &amp; IoT | 이론 | `.two-col`, `.diagram`, `.info-box.warning` |
| 14 | [5교시] Section | `.section-slide` | `.section-num` |
| 15 | DevOps &amp; 로우코드/노코드 | 이론 | `.two-col`, `.table-wrapper`, `.info-box.warning` |
| 16 | DX &amp; PM 역할 + 학습 로드맵 | 실무 | `.two-col`, `.table-wrapper`, `.info-box.gold` |
| 17 | Day 16 핵심 키워드 (24개) | 요약 | `.keyword-tags` |
| 18 | 학습 확인 퀴즈 (Q1~Q3) | 퀴즈 | `.quiz-box`, `<details>` |
| 19 | 다음 Day 예고 — Day 17 총정리 | 예고 | `.card-grid`, `.info-box.gold` |

---

## 3. 소스 파일 커버리지 분석

### 3-1. 포함된 내용

#### 1교시: AI / 머신러닝
✅ AI 발전 4단계 (규칙기반→ML→딥러닝→생성형 AI) — step diagram (Slide 5)  
✅ 약한 AI vs 강한 AI 개념 (Slide 5)  
✅ 지도학습/비지도학습/강화학습 3유형 비교표 + 예시 (Slide 5)  
✅ CNN/RNN/Transformer 딥러닝 구조 (Slide 6)  
✅ 생성형 AI 업무 활용 사례 (Slide 6)  
✅ AI 프로젝트 PM 리스크 5가지 (Slide 6)  
✅ 정확도/재현율/F1 Score 성능 지표 (Slide 6)  

#### 2교시: 클라우드 심화
✅ Docker 컨테이너 개념 + Kubernetes 역할 (Slide 8)  
✅ MSA와 컨테이너 연계 (Slide 8)  
✅ 서버리스/FaaS 개념 + AWS Lambda (Slide 8)  
✅ 이벤트 기반 아키텍처 (Slide 8)  
✅ 클라우드 3대 플랫폼 + 핵심 서비스 (Slide 8)  
✅ 마이그레이션 6R 전략 전체 6가지 (Slide 9)  
✅ 클라우드 비용 모델 3종 (On-Demand/Reserved/Spot) (Slide 9)  

#### 3교시: 빅데이터
✅ 빅데이터 5V 전체 (Volume/Velocity/Variety/Veracity/Value) (Slide 11)  
✅ 빅데이터 기술 스택 5단계 표 (Slide 11)  
✅ 데이터 분석 프로세스 6단계 (Slide 11)  

#### 4교시: 블록체인 & IoT
✅ 분산 원장 기술 개념 (Slide 13)  
✅ 블록 구조 + 합의 알고리즘 3종 (Slide 13)  
✅ 퍼블릭/프라이빗/컨소시엄 분류 (Slide 13)  
✅ 스마트 컨트랙트 (Slide 13)  
✅ IoT 4단계 아키텍처 (센서→네트워크→플랫폼→서비스) (Slide 13)  
✅ 엣지 컴퓨팅 개념 + IoT PM 리스크 (Slide 13)  

#### 5교시: DevOps & 로우코드 & DX
✅ CI/CD 파이프라인 개념 (Slide 15)  
✅ DevOps 도구 체인 4종 (Slide 15)  
✅ DevSecOps + Shift Left 개념 (Slide 15)  
✅ Infrastructure as Code (Terraform) (Slide 15)  
✅ 로우코드/노코드 개념 + 주요 플랫폼 (Slide 15)  
✅ 시민 개발자, PM 활용 포인트 (Slide 15)  
✅ DX 정의 + 4대 추진 요소 (리더십/문화/기술/데이터) (Slide 16)  
✅ PM의 DX 역할 (비즈니스-IT 브릿지) (Slide 16)  

#### 6교시: 종합
✅ 향후 학습 로드맵 (PMP/CAPM/PSM/ITIL/AWS SAA) (Slide 16)  

---

### 3-2. 보완 자료로 해결된 항목

| 미포함 항목 | 이유 |
|------------|------|
| 소스 오류성 내용 (오타/비정상 텍스트) | ✅ 보완 자료 B-3 (양자 컴퓨팅+PQC 정확한 내용으로 대체 완성) |
| DORA 4지표 (Day12에서 이미 커버) | Day12에서 CI/CD와 함께 상세 설명됨 — 중복 방지 (유지) |
| 클라우드 비용 모델 (On-Demand/Reserved/Spot) | ✅ 보완 자료 B-2 (5모델 비교·할인율·TCO 분석항목 완성) |
| Hadoop 내부 구조 (MapReduce 동작 원리) | PM 관점 개념 이해로 충분, 기술 구현 세부사항 생략 (유지) |

---

## 4. 시각화 요소

| 요소 | 위치 | 설명 |
|------|------|------|
| AI 발전 4단계 diagram | Slide 5 | 단계별 배경색 차별화 (규칙기반→생성형 AI) |
| ML 3유형 comparision | Slide 5 | 지도/비지도/강화학습 3행 비교표 |
| 컨테이너 vs 서버리스 | Slide 8 | `.comparison` 좌우 분할 |
| 빅데이터 5V cards | Slide 11 | 이모지+설명 세로 카드 |
| IoT 4단계 diagram | Slide 13 | step 컴포넌트 수직 배치 |

---

## 5. 타 Day와의 연계 지점

| 연계 슬라이드 | 연결 Day | 연계 내용 |
|------|------|------|
| Slide 6 AI 데이터 거버넌스 | Day 15 | 데이터 거버넌스·품질 관리 |
| Slide 6 AI 보안 리스크 | Day 14 | GDPR/개인정보보호 준수 |
| Slide 9 마이그레이션 리스크 | Day 09 | 리스크 등록부에 기술 이전 리스크 반영 |
| Slide 13 IoT 보안 취약점 | Day 14 | IoT 기기 보안 — OWASP IoT |
| Slide 15 DevSecOps | Day 14 | SDLC 단계별 보안 활동 (Shift Left) |
| Slide 16 DX 이해관계자 관리 | Day 11 | 변화 관리에서 이해관계자 저항 관리 |
| Slide 15 CI/CD | Day 12 | SW공학 CI/CD 파이프라인 심화 |

---

## 6. 시험 출제 포인트

### HIGH 빈도 예상

1. **머신러닝 3유형** — 지도/비지도/강화학습의 차이와 예시
2. **클라우드 마이그레이션 6R** — 각 전략명과 의미 (특히 Rehost vs Refactor)
3. **빅데이터 5V** — 각 V의 영문명과 의미 (특히 Value가 최종 목표)
4. **CI/CD** — CI(지속적 통합)와 CD(지속적 배포)의 차이
5. **블록체인** — 분산 원장, 위변조 불가 원리, 스마트 컨트랙트

### MEDIUM 빈도 예상

6. **컨테이너 vs 서버리스** — 각 개념과 대표 서비스(Docker/Kubernetes vs Lambda)
7. **생성형 AI 리스크** — PM 관점 데이터 편향, MLOps 부재
8. **DevSecOps** — Shift Left 의미 (개발 초기 보안 통합)
9. **DX 4대 요소** — 리더십·문화·기술·데이터
10. **로우코드** — 시민 개발자, 벤더 종속성 한계

### PM 실무 연결

11. PM의 AI 프로젝트 관리 핵심 — 데이터 품질·편향·MLOps
12. 클라우드 비용 최적화 — Reserved vs Spot 활용 전략
13. DX 프로젝트에서 비즈니스-IT 브릿지 역할


---

## 보완 자료 (슬라이드 미포함 핵심 내용)

### B-1. AI/ML 성능 지표 공식 — PM 모니터링 기준

| 지표 | 공식 | 의미 | 중요 상황 |
|------|------|------|---------|
| Accuracy | (TP+TN)/(전체) | 전체 중 맞은 비율 | 클래스 균형 데이터 |
| Precision | TP/(TP+FP) | 양성 예측 중 실제 양성 비율 | False Positive 비용이 클 때 (스팸 필터) |
| Recall | TP/(TP+FN) | 실제 양성 중 찾아낸 비율 | False Negative 비용이 클 때 (암 진단) |
| F1-Score | 2×(P×R)/(P+R) | Precision·Recall 조화평균 | 불균형 데이터셋 |
| AUC-ROC | 곡선 아래 면적 (0~1) | 분류 임계값 독립적 성능 | 임계값 미결정 단계 |

> **PM 관점**: 모델 배포 기준(예: Recall ≥ 0.90)을 사전에 Definition of Done에 명시

---

### B-2. 클라우드 비용 모델 비교 — On-Demand / Reserved / Spot

| 모델 | 약정 | 할인율 | 적합 워크로드 |
|------|------|------|------------|
| On-Demand | 없음 (시간 단위) | - | 단기 파일럿, 개발 환경 |
| Reserved (1년) | 1년 약정 | AWS 기준 ~40% 절감 | 안정적 기본 워크로드 |
| Reserved (3년) | 3년 약정 | AWS 기준 ~60% 절감 | 운영 핵심 시스템 |
| Spot/Preemptible | 없음 (중단 허용) | ~70~90% 절감 | 배치 처리, ML 학습 |
| Savings Plan | 사용량 약정 | Reserved와 유사 | 멀티 서비스 유연 적용 |

**TCO 분석 시 항목**:
- 컴퓨팅 비용 + 스토리지 비용 + 네트워크(Egress) 비용 + 지원 플랜 비용 + 라이선스 비용

---

### B-3. 양자 컴퓨팅 — PM이 알아야 할 핵심 개념

| 개념 | 설명 | 프로젝트 영향 |
|------|------|------------|
| 큐비트(Qubit) | 0과 1 동시 표현(중첩) → 기하급수적 연산 능력 | 특정 최적화 문제 해결 가속 |
| 슈퍼포지션 | 0·1 동시 상태 유지 | 현재 암호화 체계 위협 가능 |
| 얽힘(Entanglement) | 독립 큐비트 간 상관관계 | 통신·시뮬레이션 활용 |
| 양자 오류 보정 | 노이즈로 인한 오류 보정 기술 | 실용화 장벽 |

**PQC (Post-Quantum Cryptography)** — NIST 2024년 표준화:
- **CRYSTALS-Kyber** (KEM): 키 교환 →  대체 ECDH
- **CRYSTALS-Dilithium** (서명): 디지털 서명 → 대체 RSA/ECDSA
- PM 인지 필요: 2030년 이후 RSA-2048 취약 → 장기 프로젝트 마이그레이션 계획 수립

---

### B-4. 신기술 도입 리스크 관리 — Technology Readiness Level (TRL)

| TRL 단계 | 설명 | PM 판단 기준 |
|---------|------|------------|
| TRL 1-3 | 기초 연구 ~ 개념 검증 | 도입 금지 (R&D 단계) |
| TRL 4-6 | 실험실 검증 ~ 시제품 | 파일럿만 허용, 위험 예비비 확보 |
| TRL 7-8 | 시스템 검증 ~ 실용 검증 | 제한적 도입, 마이그레이션 계획 필수 |
| TRL 9 | 운영 환경 검증 완료 | 일반 도입 가능 |
