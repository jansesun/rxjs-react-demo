function seedSort(n, num) {
    if(num === void 0) {
        num = n;
    }
    let result = [];
    function _seedSort(n, num) {
        var len = result.length;
        if(len === num) {
            return;
        }
        if(len === 0) {
            result.push(1);
        } else {
            if(!((len - 1) & len)) {
                for(var i = len - 1; i >= 0 && num !== result.length; --i) {
                    result.push(result[i] + (i % 2 ? -1 : 1) * (n / len - 1));
                }
            }
        }
        _seedSort(n, num);
    }
    _seedSort(n, num);
    return result;
}
/**
 * alist = [
 *   {
 *     name: 'SunJian',
 *     seedIndex: 1,
 *     gender: 1 // 1 为男生 0为女生
 *   }
 * ];
 */
export default function draw(list) {
    // 报名总人数
    const playerNum = list.length;

    // 种子选手按顺序排位
    const seededPlayers = list.filter(player => player.seedIndex !== void 0);
    seededPlayers.sort((player1, player2) => player1.seedIndex - player2.seedIndex);

    // 非种子女选手随机排位
    const unseededGirls = list.filter(player => player.gender === 0 && player.seedIndex === void 0);
    unseededGirls.sort(() => Math.random() - 0.5);

    // 其他选手随机排位
    const otherPlayers = list.filter(player => player.gender === 1 && player.seedIndex === void 0);
    otherPlayers.sort(() => Math.random() - 0.5);

    const positionNum = 1 << Math.ceil(Math.log2(playerNum));
    const drawIndex = seedSort(positionNum);
    const sortedPlayers = [...seededPlayers, ...unseededGirls, ...otherPlayers];
    const drawResult = [];
    drawIndex.forEach((v, i) => {
        const index = i >> 1;
        drawResult[index] = [...(drawResult[index] || []), sortedPlayers[v - 1] || {
          name: 'N/A',
          gender: 1
        }];
    });
    return drawResult;
}
// var alist = [
//     {
//         name: '龚航',
//         seedIndex: 1,
//         gender: 1
//     },
//     {
//         name: '马冉',
//         gender: 1
//     },
//     {
//         name: '程紫光',
//         gender: 1
//     },
//     {
//         name: '徐凡',
//         gender: 1
//     },
//     {
//         name: '周清华',
//         gender: 1
//     },
//     {
//         name: '王向阳',
//         gender: 1
//     },
//     {
//         name: '曾超宇',
//         gender: 1
//     },
//     {
//         name: '何志鹏',
//         gender: 1
//     },
//     {
//         name: '杨凯',
//         gender: 1
//     },
//     {
//         name: '郭柄男',
//         gender: 0
//     },
//     {
//         name: '王迪',
//         gender: 1
//     },
//     {
//         name: '渠慧帆',
//         gender: 1
//     },
//     {
//         name: '杨帆',
//         gender: 1
//     },
//     {
//         name: '李林涛',
//         gender: 1
//     },
//     {
//         name: '付瑶',
//         gender: 0
//     },
//     {
//         name: '胡盛昌',
//         gender: 1
//     },
//     {
//         name: '高鹏',
//         gender: 1
//     },
//     {
//         name: '赵强',
//         gender: 1
//     },
//     {
//         name: '葛江华',
//         gender: 1
//     },
//     {
//         name: '余俊杰',
//         gender: 1
//     },
//     {
//         name: '吕兢',
//         gender: 1
//     },
//     {
//         name: '常龙',
//         gender: 1
//     },
//     {
//         name: '孙健',
//         gender: 1
//     },
//     {
//         name: '彭曲',
//         gender: 1
//     },
//     {
//         name: '汪鹭',
//         gender: 0
//     }
// ];
// draw(alist);