declare @CStaffid NVARCHAR(50) = '02148'

SELECT a.CStaffId   AS staffId
	,a.CLoginId      AS loginId
	,a.CName0        AS staffName
	,f.CMobileNo     AS mobileNo
	,b.CDepartCode   AS departCode
	,d.CName0        AS departName
	,h.CFacilityCode AS facilityCode
	,h.CFacilityType AS facilityType
	,c.CLevelCode    AS rankCode
	,y.CLevelCode    AS dutyCode
	,z.CLevelCode    AS positionCode
	,e.CName0        AS rankName
	,a.CJoinDate     AS joinDate
	,a.COutDate	     AS outDate
	,g.profile_idx   AS profile_idx
FROM TStaff a(NOLOCK)
INNER JOIN ( -- 현재 부서
			SELECT CStaffId, CDepartCode, CDepartStartDate
			FROM TStaffDepartHistory(NOLOCK)
			WHERE 1=1
				AND CMain = 1
				AND CHistoryEndDate >= GETDATE()
			GROUP BY CStaffId, CDepartCode, CDepartStartDate
			) b ON a.CStaffId = b.CStaffId
LEFT JOIN ( -- 현재 직급
			SELECT CStaffId, CLevelType, MAX(CLevelCode) AS CLevelCode
			FROM TStaffLevelHistory(NOLOCK)
			WHERE 1=1
				AND CMain = 1
				AND CLevelType = 'Rank'
				AND CEndDate >= GETDATE()
			GROUP BY CStaffId, CLevelType
			) c ON a.CStaffId = c.CStaffId
LEFT JOIN ( -- 현재 직책
			SELECT CStaffId, CLevelType, MAX(CLevelCode) AS CLevelCode
			FROM TStaffLevelHistory(NOLOCK)
			WHERE 1=1
				AND CMain = 1
				AND CLevelType = 'Duty'
				AND CEndDate >= GETDATE()
			GROUP BY CStaffId, CLevelType
			) y ON a.CStaffId = y.CStaffId
LEFT JOIN ( -- 현재 직위
			SELECT CStaffId, CLevelType, MAX(CLevelCode) AS CLevelCode
			FROM TStaffLevelHistory(NOLOCK)
			WHERE 1=1
				AND CMain = 1
				AND CLevelType = 'Position'
				AND CEndDate >= GETDATE()
			GROUP BY CStaffId, CLevelType
			) z ON a.CStaffId = z.CStaffId
--LEFT JOIN TDepartment d(NOLOCK)         ON b.CDepartCode = d.CDepartCode AND b.CDepartStartDate = d.CDepartStartDate
LEFT JOIN (
SELECT
d.CName0 AS branchName
	FROM TDepartNowMember AS m(NOLOCK)
LEFT JOIN TDepartment AS d(NOLOCK) ON d.CDepartCode = m.CDepartCode
LEFT JOIN TFacility AS h(NOLOCK) ON m.CDepartCode = h.CDepartCode AND m.CDepartStartDate = h.CDepartStartDate
WHERE m.cstaffid = @staffId
)


LEFT JOIN TStaffLevel e(NOLOCK)         ON c.CLevelType = e.CLevelType AND c.CLevelCode = e.CLevelCode
LEFT JOIN TStaffAddress f(NOLOCK)       ON a.CStaffId = f.CStaffId
LEFT JOIN otbl_Member_profile g(NOLOCK) ON a.CStaffId = g.staff_id
LEFT JOIN TFacility h(NOLOCK)          ON h.CDepartCode = d.CDepartCode
WHERE 1=1
	AND a.CStaffId = @CStaffId