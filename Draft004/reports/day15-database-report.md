# Day 15 슬라이드 생성 보고서 — 데이터베이스

## 1. 생성 파일 정보

| 항목 | 내용 |
|------|------|
| **슬라이드 파일** | `Draft004/slides/day15-database-slide.html` |
| **소스 파일** | `Draft004/summaries/day15-database.md` |
| **총 슬라이드 수** | 17장 |
| **생성 일시** | 2025년 (Day15 배치 생성) |

---

## 2. 슬라이드 구성 목록

| # | 슬라이드 제목 | 유형 | 사용 CSS 클래스 |
|---|------|------|----------------|
| 1 | Day 15: 데이터베이스 | `.title-slide` | `.day-badge`, `.title-meta` |
| 2 | 학습 목표 (4 카드) | 학습 목표 | `.card-grid` |
| 3 | 오늘의 흐름 — 6교시 | 플로우 | `.diagram`, `.step`, `.arrow` |
| 4 | [1~2교시] Section | `.section-slide` | `.section-num` |
| 5 | RDBMS 핵심 용어 &amp; 키 체계 | 이론 | `.two-col`, `.table-wrapper`, `.info-box` |
| 6 | 트랜잭션 &amp; ACID 4속성 | 이론 | `.card-grid`, `.info-box.gold` |
| 7 | [3교시] Section | `.section-slide` | `.section-num` |
| 8 | ERD &amp; 데이터 모델링 | 이론+SVG | `.two-col`, inline SVG (ERD 관계도) |
| 9 | [4교시] Section | `.section-slide` | `.section-num` |
| 10 | SQL 분류 &amp; SELECT 구문 | 이론 | `.two-col`, `.table-wrapper`, `.info-box.gold` |
| 11 | JOIN 4종 — 핵심 비교 | 이론+SVG | `.two-col`, `.table-wrapper`, inline SVG (벤다이어그램) |
| 12 | [5교시] Section | `.section-slide` | `.section-num` |
| 13 | 정규화 &amp; 반정규화 | 이론 | `.two-col`, `.diagram`, `.table-wrapper` |
| 14 | 데이터 트렌드 &amp; PM 관점 | 실무 | `.two-col`, `.table-wrapper`, `.info-box.gold` |
| 15 | Day 15 핵심 키워드 (26개) | 요약 | `.keyword-tags` |
| 16 | 학습 확인 퀴즈 (Q1~Q3) | 퀴즈 | `.quiz-box`, `<details>` |
| 17 | 다음 Day 예고 — Day 16 신기술 | 예고 | `.card-grid`, `.info-box.gold` |

---

## 3. 소스 파일 커버리지 분석

### 3-1. 포함된 내용

#### 1교시: 데이터베이스 개요 & RDBMS 기초
✅ 테이블=릴레이션, 행=레코드/튜플, 열=필드/속성 동의어 체계 (Slide 5)  
✅ PK/FK/후보키/복합키 → 키 체계 4종 정리 (Slide 5)  
✅ 관계 3종 (1:1 / 1:N / M:N → 중간 테이블 해소) (Slide 5)  
✅ 무결성 3종 (개체/참조/도메인) (Slide 5)  

#### 2교시: ACID 트랜잭션
✅ 트랜잭션 개념 (모두 성공 or 모두 취소) (Slide 6)  
✅ Atomicity/Consistency/Isolation/Durability 각 설명 + 은행 이체 예시 (Slide 6)  
✅ COMMIT/ROLLBACK/SAVEPOINT 명령 (Slide 6 info-box.gold)  

#### 3교시: ERD & 데이터 모델링
✅ 3단계 모델링 (개념적→논리적→물리적) (Slide 8)  
✅ ERD 3요소 (Entity/Attribute/Relationship) + 시각 표기 (Slide 8)  
✅ 카디널리티 3종 (1:1/1:N/M:N) (Slide 8)  
✅ 표기법 3종 (Chen/Crow's Foot/IE) + 실무 표준 강조 (Slide 8)  
✅ 고객-주문-상품-결제 ERD 예시 inline SVG (Slide 8)  

#### 4교시: SQL 기초
✅ DDL/DML/DCL/TCL 4분류 완전 포함 (Slide 10)  
✅ SELECT 절 순서 (SELECT→FROM→WHERE→GROUP BY→HAVING→ORDER BY) (Slide 10)  
✅ 집계함수 5종 (COUNT/SUM/AVG/MAX/MIN) (Slide 11 SVG)  
✅ JOIN 4종 (INNER/LEFT/RIGHT/FULL OUTER) + 벤다이어그램 SVG (Slide 11)  
✅ WHERE/LIKE/BETWEEN/IN 조건 표현 (Slide 11 SVG)  

#### 5교시: 정규화 & NoSQL
✅ 이상 현상 3종 (삽입/갱신/삭제 이상) (Slide 13)  
✅ 정규화 3단계 (1NF/2NF/3NF) + BCNF 개념 (Slide 13)  
✅ 반정규화 개념 + 주의사항 (Slide 13)  
✅ RDBMS vs NoSQL 6개 항목 비교표 (Slide 13)  
✅ ACID vs BASE 개념 대비 (Slide 13)  
✅ 수직 Scale-up vs 수평 Scale-out (Slide 13)  

#### 6교시: 데이터 트렌드 & PM 관점
✅ DW/데이터 레이크/ETL/데이터 거버넌스 개념 (Slide 14)  
✅ PM 관점 5가지 (마이그레이션/성능 요구사항/RPO·RTO/개인정보/기술선택) (Slide 14)  
✅ DB 관련 PM 리스크 4가지 (Slide 14)  

---

### 3-2. 보완 자료로 해결된 항목

| 미포함 항목 | 이유 |
|------------|------|
| NoSQL 4유형 상세 (Redis/MongoDB/Cassandra/Neo4j 각각) | ✅ 보완 자료 B-1 (4유형·대표제품·강점·적합사례 완성) |
| INNER JOIN 구체적 SQL 문법 예제 | 개념 이해 우선, 실무 SQL은 별도 실습 범위 (유지) |
| 서브쿼리 3종 위치 (WHERE절/FROM절/SELECT절) | ✅ 보완 자료 B-2 (위치별 예시 구조·EXISTS vs IN 완성) |
| RDBMS 4종 제품 비교 (Oracle/MySQL/PostgreSQL/MS SQL 특성) | ✅ 보완 자료 B-3 (라이선스·특징·적합규모 완성) |
| BCNF 상세 (결정자→후보키 조건) | ✅ 보완 자료 B-4 (1NF~BCNF 정규화 단계·비정규화 포함 완성) |

---

## 4. 시각화 요소

| 요소 | 위치 | 설명 |
|------|------|------|
| ERD 관계도 SVG | Slide 8 | 고객→주문→상품 1:N/M:N 관계, 중간 테이블 점선 표시 |
| JOIN 벤다이어그램 SVG | Slide 11 | INNER/LEFT/FULL OUTER 3종 벤다이어그램 비교 |
| 정규화 단계 diagram | Slide 13 | 1NF→2NF→3NF 컬러별 step 구조 |

---

## 5. 타 Day와의 연계 지점

| 연계 슬라이드 | 연결 Day | 연계 내용 |
|------|------|------|
| Slide 10 DCL 명령 | Day 14 | GRANT/REVOKE → RBAC 접근제어 |
| Slide 14 RPO/RTO | Day 14 | 보안 BCP/DR의 DB 백업 전략 연계 |
| Slide 14 PM 리스크 | Day 09 | DB 장애를 리스크 등록부에 반영 |
| Slide 6 ACID | Day 14 | 데이터 무결성 보안 속성과 연계 |

---

## 6. 시험 출제 포인트

### HIGH 빈도 예상

1. **ACID 4속성** — 각 속성명(영어/한글)과 의미, 트랜잭션 예시
2. **JOIN 4종 차이** — INNER vs LEFT vs FULL OUTER 결과 집합 차이
3. **정규화 단계** — 1NF/2NF/3NF의 이상 현상 제거 원칙
4. **PK vs FK** — 역할 차이, 무결성 제약 조건
5. **M:N 관계 해소 방법** — 중간 테이블 생성 원리

### MEDIUM 빈도 예상

6. **SQL 4분류** — DDL/DML/DCL/TCL 각 명령어 분류
7. **SELECT 절 순서** — WHERE vs HAVING 차이 (행 vs 그룹 필터)
8. **RDBMS vs NoSQL 비교** — ACID vs BASE, 수직 vs 수평 확장
9. **ERD 표기법** — Crow's Foot 실무 표준 이유
10. **반정규화** — 목적(성능)과 부작용(일관성 관리)

### PM 실무 연결

11. **PM 5대 DB 관리 포인트** — 마이그레이션/TPS/RPO·RTO/개인정보보호/기술선택
12. **데이터 거버넌스** — 품질·표준·정책 관리의 PM 책임


---

## 보완 자료 (슬라이드 미포함 핵심 내용)

### B-1. NoSQL 4대 유형 — 제품 비교 상세

| 유형 | 대표 제품 | 데이터 모델 | 강점 | 적합 사례 |
|------|---------|----------|------|---------|
| Key-Value | Redis, DynamoDB, Riak | 단순 KV 쌍 | 극초고속 읽기/쓰기 | 세션, 캐시, 장바구니 |
| Document | MongoDB, CouchDB, Firestore | JSON/BSON 문서 | 유연한 스키마, 중첩 구조 | 콘텐츠 관리, 카탈로그 |
| Column-Family | Cassandra, HBase | 열 패밀리 | 대용량 쓰기, 시계열 | IoT, 로그, 소셜 피드 |
| Graph | Neo4j, Amazon Neptune | 노드·엣지 | 관계 탐색 최적화 | 추천 엔진, 소셜 그래프, 사기 탐지 |

---

### B-2. SQL 서브쿼리 3가지 위치

| 위치 | 예시 구조 | 용도 |
|------|---------|------|
| WHERE 절 | `WHERE id IN (SELECT id FROM ...)` | 조건 필터링 |
| FROM 절 (인라인 뷰) | `FROM (SELECT ... ) AS sub` | 중간 결과 집합 생성 |
| SELECT 절 (스칼라) | `SELECT (SELECT COUNT(*) FROM ...)` | 단일 값 계산 반환 |

**EXISTS vs IN 차이**:
- `IN`: 서브쿼리 결과를 메모리에 전부 로드 후 비교 → 소규모 데이터 유리
- `EXISTS`: 조건 만족 시 즉시 탐색 중단(short-circuit) → 대용량 유리

---

### B-3. RDBMS 4종 비교 — 프로젝트 선택 기준

| 제품 | 라이선스 | 특징 | 적합 규모 |
|------|--------|------|---------|
| Oracle DB | 상용 (high cost) | 고가용성, RAC 클러스터, 금융권 표준 | 대기업·금융 |
| MySQL | 오픈소스 (GPL) | 웹 서비스 표준, 빠른 읽기 | 스타트업~중기업 |
| PostgreSQL | 오픈소스 (MIT급) | ACID 완전 준수, 복잡 쿼리·JSON 지원 | 모든 규모 |
| MS SQL Server | 상용 (MS) | Azure 통합, .NET 생태계 최적 | MS 스택 조직 |

---

### B-4. 정규화 3NF까지 — 설계 품질 지표

| 정규형 | 조건 | 제거하는 문제 |
|-------|------|-------------|
| 1NF | 원자값만 허용, 반복 그룹 제거 | 다중 값 속성 |
| 2NF | 1NF + 부분 함수 종속 제거 | 복합 키의 일부에만 의존 |
| 3NF | 2NF + 이행 함수 종속 제거 | A→B→C 중 A→C 직접 종속 제거 |
| BCNF | 3NF + 모든 결정자가 후보 키 | 3NF 예외 케이스 해결 |

> **비정규화(Denormalization)**: 읽기 성능 향상을 위해 의도적 중복 허용 — OLAP/데이터웨어하우스에서 사용
