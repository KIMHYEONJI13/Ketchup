import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callMembersAPI, callDepartmentsAPI, callPositionsAPI, callAllPositionsAPI } from "../../apis/MemberAPICalls";
import Tree from 'react-d3-tree';


function OrganizationChart() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const departments = useSelector(state => state.departmentReducer);
    const positions = useSelector(state => state.positionReducer);
    const [treeData, setTreeData] = useState([]);



    useEffect(() => {
        dispatch(callMembersAPI());
        dispatch(callDepartmentsAPI());
        dispatch(callAllPositionsAPI());
    }, []);

    useEffect(() => {



        if (members.length > 0 && departments.length > 0 && positions.length > 0) {
            const CEO = members?.find(member => member.position.positionNo === 3);
            const data = {
                name: `${CEO.memberName}${CEO.position.positionName}`,
                image: `img/${CEO.imgUrl}`,
                children: departments .filter((department) => department.depName !== '대표')
                .map((department) => ({
                    name: department.depName,
                    image: 'images/DepIcon2.png',

                    children: members
                        .filter((member) => member.department.depNo === department.depNo)
                        .filter((member) => member.department.leader === member.memberName)
                        .map((teamLeader) => ({
                            name: `팀장 ${teamLeader.memberName}${teamLeader.position.positionName}`,
                            image: `img/${teamLeader.imgUrl}`,
                            children: members
                                .filter((member) => member.department.depNo === department.depNo && member.position.positionName != '대표')
                                .sort((a, b) => {
                                    return b.position.positionLevel - a.position.positionLevel;
                                })
                                .map((member) => ({
                                    name: `${member.memberName}${member.position.positionName}`,
                                    image: `img/${member.imgUrl}`,
                                    children: [] // 자식 노드가 없음을 나타내기 위해 빈 배열 할당
                                }))

                        }))
                }))
            };

            setTreeData([data]);
            console.log(data);
        }
    }, [members, departments, positions]);

    const containerStyles = {
        width: '100%',
        height: '100vh',
    };

    const renderCustomNodeElement = ({ nodeDatum,toggleNode }) => (
        <g>
           
            <rect width="150" height="100" x="-75" y="-45" rx="20" ry="20"
                fill="white" stroke="#E80D06" strokeWidth="4" onClick={toggleNode}
            >
            </rect>
            <text y="-15" textAnchor="middle" alignmentBaseline="middle"   >
                {nodeDatum.name}
            </text>
            <image
                x="-35"
                y="-0"
                href={nodeDatum.image} // 사진 표시
                width="70"
                height="50"
            />
        </g>
    );

    return (
        <main id="main">
            <h2 style={{ marginLeft: '70px', marginTop: 30 }}>조직도</h2>
            <div className="container">

                <div style={containerStyles}>
                    {treeData.length > 0 && (
                        <Tree
                            data={treeData}
                            orientation="vertical"
                            translate={{ x: 600, y: 200 }}
                            collapsible={true}
                            pathFunc= "step"
                            renderCustomNodeElement={renderCustomNodeElement}
                            nodeSize={{ x: 200, y: 150 }}
                            separation={{ siblings: 0.9, nonSiblings: 0.8 }}
                            initialDepth={2} 
                          
                            
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default OrganizationChart;