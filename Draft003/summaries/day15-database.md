# Day 15: 데이터베이스 (Database)

## 📋 강의 개요

| 항목 | 내용 |
|------|------|
| **과목명** | 데이터베이스 기초 |
| **교육시간** | 8시간 (오전 4시간 / 오후 4시간) |
| **학습목표** | 데이터베이스 기본 개념과 SQL, 데이터 모델링을 이해한다 |
| **선수학습** | Day 1-14 |

---

## 🎯 학습 목표

1. 데이터베이스와 DBMS의 개념을 이해하고 RDBMS의 핵심 개념을 설명할 수 있다
2. ERD(개체-관계 다이어그램)를 읽고 기본적인 모델을 작성할 수 있다
3. SQL 기본 구문(SELECT, JOIN)을 이해할 수 있다
4. 정규화의 개념과 목적을 이해하고 NoSQL과의 차이를 설명할 수 있다

---

## 📚 강의 구성

### 오전 세션 (4시간)

#### 1교시: 데이터베이스 개요 (1시간)
- **데이터베이스(Database)의 정의**: 구조적으로 조직된 데이터의 집합
- **DBMS(Database Management System)**: DB를 관리하는 소프트웨어
- **데이터베이스의 특성**
  - 실시간 접근성(Real-time Accessibility)
  - 계속적인 변화(Continuous Evolution)
  - 동시 공용(Concurrent Sharing)
  - 내용에 의한 참조(Content Reference)
- **데이터베이스의 종류**
  - 관계형(RDBMS): Oracle, MySQL, PostgreSQL, MS SQL Server
  - NoSQL: MongoDB, Redis, Cassandra, Neo4j
  - NewSQL, 인메모리 DB
- **PM이 DB를 알아야 하는 이유**
  - 데이터 구조와 비즈니스 로직의 관계 이해
  - 데이터 마이그레이션 프로젝트 관리
  - 성능 요구사항의 현실성 판단
  - 데이터 보안 요구사항 이해

#### 2교시: RDBMS 핵심 개념 (1.5시간)
- **관계형 데이터베이스 핵심 용어**
  - 테이블(Table) = 릴레이션(Relation)
  - 행(Row) = 레코드(Record) = 튜플(Tuple)
  - 열(Column) = 필드(Field) = 속성(Attribute)
  - 도메인(Domain): 속성이 가질 수 있는 값의 범위
- **키(Key)**
  - 기본키(Primary Key, PK): 각 행을 고유하게 식별
  - 외래키(Foreign Key, FK): 다른 테이블의 PK를 참조
  - 후보키(Candidate Key), 대체키(Alternate Key)
  - 복합키(Composite Key)
- **관계(Relationship)**
  - 1:1 (일대일)
  - 1:N (일대다) - 가장 일반적
  - M:N (다대다) → 중간 테이블로 해소
- **무결성 제약조건**
  - 개체 무결성: PK는 NULL 불가
  - 참조 무결성: FK는 참조 대상이 존재해야 함
  - 도메인 무결성: 정의된 도메인 범위 내 값만 허용
- **트랜잭션(Transaction)과 ACID**
  - Atomicity(원자성): 전부 수행 또는 전부 취소
  - Consistency(일관성): 트랜잭션 전후 DB 일관성 유지
  - Isolation(독립성): 동시 실행 시 서로 영향 없음
  - Durability(영속성): 완료된 트랜잭션은 영구 반영

#### 3교시: ERD와 데이터 모델링 (1.5시간)
- **데이터 모델링의 3단계**
  - 개념적 모델링: 핵심 개체(Entity)와 관계 도출
  - 논리적 모델링: 속성, 키, 정규화 적용
  - 물리적 모델링: DBMS에 맞는 테이블, 인덱스, 파티션 설계
- **ERD(Entity-Relationship Diagram)**
  - 개체(Entity): 사각형 - 관리 대상 (고객, 주문, 상품)
  - 속성(Attribute): 타원 - 개체의 특성
  - 관계(Relationship): 마름모 - 개체 간 연결
  - 카디널리티(Cardinality): 관계의 수적 표현 (1:1, 1:N, M:N)
- **ERD 표기법**
  - Chen 표기법: 학술적
  - Crow's Foot(까마귀발) 표기법: 실무에서 가장 많이 사용
  - IE 표기법
- **ERD 읽기 실습**
  - 주문 관리 시스템 ERD 예시 분석
  - 고객-주문-상품-결제 관계 이해

### 오후 세션 (4시간)

#### 4교시: SQL 기초 (2시간)
- **SQL(Structured Query Language)의 분류**
  - DDL(Data Definition): CREATE, ALTER, DROP, TRUNCATE
  - DML(Data Manipulation): SELECT, INSERT, UPDATE, DELETE
  - DCL(Data Control): GRANT, REVOKE
  - TCL(Transaction Control): COMMIT, ROLLBACK, SAVEPOINT
- **SELECT 문 기초**
  ```sql
  SELECT 컬럼명 FROM 테이블명
  WHERE 조건
  GROUP BY 그룹 기준
  HAVING 그룹 조건
  ORDER BY 정렬 기준
  ```
- **⭐ 인사 DB 실습 (비전공자용)**
  - 직원 테이블로 기본 SQL 연습
  - 예: `SELECT * FROM 직원 WHERE 부서 = '개발팀'`
  - 예: `SELECT 부서, AVG(연봉) FROM 직원 GROUP BY 부서`
- **주요 SQL 기능**
  - 집계 함수: COUNT, SUM, AVG, MAX, MIN
  - 조건 연산: AND, OR, NOT, IN, BETWEEN, LIKE
  - 와일드카드: %, _
- **JOIN(조인)**
  - INNER JOIN: 양쪽 테이블에 모두 존재하는 데이터
  - LEFT JOIN: 왼쪽 테이블의 모든 데이터 + 매칭되는 오른쪽 데이터
  - RIGHT JOIN: 오른쪽 테이블의 모든 데이터 + 매칭되는 왼쪽 데이터
  - FULL OUTER JOIN: 양쪽 모든 데이터
  - CROSS JOIN: 카테시안 곱
- **서브쿼리(Subquery)**
  - WHERE 절 서브쿼리
  - FROM 절 서브쿼리 (인라인 뷰)
  - SELECT 절 서브쿼리 (스칼라 서브쿼리)

#### 5교시: 정규화와 NoSQL (1시간)
- **정규화(Normalization)**
  - 목적: 데이터 중복 최소화, 이상(Anomaly) 방지
  - **이상 현상**
    - 삽입 이상: 불필요한 데이터 함께 삽입
    - 갱신 이상: 일부만 수정 시 불일치
    - 삭제 이상: 필요한 데이터까지 삭제
  - **정규화 단계**
    - 제1정규형(1NF): 원자값 (반복 그룹 제거)
    - 제2정규형(2NF): 부분 함수 종속 제거
    - 제3정규형(3NF): 이행 함수 종속 제거
    - BCNF: 모든 결정자가 후보키
  - **반정규화(Denormalization)**: 성능 향상을 위해 의도적 중복 허용
- **NoSQL 개요**
  - Not Only SQL, 비관계형 데이터베이스
  - **유형별 분류**
    - Key-Value: Redis, DynamoDB (세션, 캐시)
    - Document: MongoDB, CouchDB (JSON 문서)
    - Column-Family: Cassandra, HBase (대규모 데이터)
    - Graph: Neo4j, Amazon Neptune (관계 중심)
  - **RDBMS vs NoSQL 비교**
    - 스키마: 고정 vs 유연
    - 확장: 수직(Scale-up) vs 수평(Scale-out)
    - 일관성: ACID vs BASE(Basically Available, Soft state, Eventually consistent)
    - 적합 케이스: 정형 데이터 vs 비정형/대용량 데이터

#### 6교시: 데이터 관리 트렌드 및 PM 관점 정리 (1시간)
- **데이터 관리 트렌드**
  - 데이터 웨어하우스(DW): 분석용 대규모 데이터 저장소
  - 데이터 레이크(Data Lake): 원시 데이터 저장 (정형+비정형)
  - ETL(Extract-Transform-Load): 데이터 통합 파이프라인
  - 데이터 거버넌스: 데이터 품질, 표준, 정책 관리
- **PM 관점에서의 데이터베이스 프로젝트 관리**
  - 데이터 마이그레이션 계획 수립
  - DB 성능 요구사항 정의 (응답시간, TPS)
  - 백업/복구 전략 수립 (RPO/RTO)
  - 데이터 보안 및 개인정보보호 요구사항
- **Q&A**

---

## 📝 핵심 키워드

| 키워드 | 설명 |
|--------|------|
| RDBMS | 관계형 데이터베이스 관리 시스템 |
| ERD | 개체-관계 다이어그램, 데이터 구조 시각화 |
| SQL | 구조화 질의 언어 |
| JOIN | 두 개 이상의 테이블 결합 |
| 정규화 | 데이터 중복 최소화, 이상 현상 방지 |
| ACID | 트랜잭션의 4가지 속성 |
| NoSQL | 비관계형 DB, 유연한 스키마 |

---

## ✅ 학습 확인 질문

1. ACID 속성의 각 요소를 은행 이체 사례로 설명하시오.
2. 1:N, M:N 관계를 각각 예시와 함께 설명하시오.
3. 정규화의 목적과 반정규화가 필요한 상황을 설명하시오.
4. RDBMS와 NoSQL을 PM 관점에서 비교하고, 각각 어떤 프로젝트에 적합한지 설명하시오.
