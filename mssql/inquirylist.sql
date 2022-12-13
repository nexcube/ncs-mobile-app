select 	a.it_QnaIdx AS idx,
		a.st_QnaTitle AS title,
		a.st_QnaContent AS content,
		a.it_QnaCatIdx AS catIdx,
		a.st_CStaffId AS staffId,
  		a.st_CFacilityCode AS facilityCode,
  		a.it_QnaShare AS share,
  		a.st_QnaStatus AS status,
  		a.dt_QnaMake AS makeDate,
  		a.dt_QnaDelete AS deleteDate,
  		a.dt_QnaUpdate AS updateDate,
  		a.dt_QnaReplayUpdate AS replyDate,
  		b.st_QnaCatName AS subCatName,
  		c.st_QnaCatName as mainCatName,
  		d.COpenName0 AS branchOfficeName,
  		f.CName0 AS levelName,
      g.CName0 AS inquirer
from tb_Qna a(NOLOCK)
inner join (
			select 	st_QnaCatName ,
					it_QnaCatIdx,
					it_ParentQnaCatIdx

			from tb_QnaCat(NOLOCK)

			) b ON a.it_QnaCatIdx = b.it_QnaCatIdx
inner join (
			select 	st_QnaCatName,
					it_ParentQnaCatIdx,
					it_QnaCatIdx
			from tb_QnaCat(NOLOCK)

			) c ON b.it_ParentQnaCatIdx = c.it_QnaCatIdx
inner join (
			select  CDepartCode,
					COpenName0
			from TFacility(NOLOCK)
			) d ON a.st_CFacilityCode = d.CDepartCode
left  JOIN ( -- 현재 직위
			SELECT 	CStaffId, CLevelType, MAX(CLevelCode) AS CLevelCode
			FROM TStaffLevelHistory(NOLOCK)
			WHERE 1=1
				AND CEndDate >= GETDATE()
			GROUP BY CStaffId, CLevelType
			) e ON a.st_CStaffId = e.CStaffId
LEFT JOIN TStaffLevel f(NOLOCK)         ON e.CLevelType = f.CLevelType AND e.CLevelCode = f.CLevelCode
inner join TStaff g(NOLOCK) On g.CStaffId = a.st_CStaffId
order by a.dt_QnaUpdate desc
OFFSET 0 ROWS
FETCH NEXT 100 ROWS ONLY;

