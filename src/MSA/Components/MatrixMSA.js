import React, { Fragment, useMemo } from 'react'
import '../CSS/MatrixMSA.css'

function ThreeDimensionalRoom(props) {
  const { xLength, yLength, zLength, path, pathRanks } = props;

  const margin = useMemo(() => {
    return 5;
  }, []);
  const size = useMemo(() => {
    return 50;
  }, []);

  const [elements, gradients] = useMemo(() => {
    const scale = Math.min(Math.floor(xLength / 20 + 1), Math.floor(yLength / 20 + 1), Math.floor(zLength / 20 + 1));
    const strokeWidth = `calc(var(--raster-width) * ${scale})`;
    const rasterStroke = 'var(--raster-color)';
    const rasterStrokeAccent = 'var(--raster-color-accent)';
    const shadowStroke = 'var(--path-shadow-color)';
    const scaledSize = 50 * scale;
    const scaledxLength = xLength / (scale)
    const scaledyLength = yLength / (scale)
    const scaledzLength = zLength / (scale)
    let elements_ = [];
    for (let x = 0; x <= scaledxLength; x++) {
      elements_.push(<line
        x1={margin + scaledSize * (scaledzLength / 2 + x)}
        y1={margin}
        x2={margin + scaledSize * (scaledzLength / 2 + x)}
        y2={margin + scaledSize * scaledyLength}
        key={`xy-x${x}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />);
      elements_.push(<line
        x1={margin + scaledSize * (scaledzLength / 2 + x)}
        y1={margin + scaledSize * scaledyLength}
        x2={margin + scaledSize * x}
        y2={margin + scaledSize * (scaledzLength / 2 + scaledyLength)}
        key={`xz-x${scaledxLength - x}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />);
    }
    for (let y = 0; y <= scaledyLength; y++) {
      elements_.push(<line
        x1={margin}
        y1={margin + scaledSize * (scaledzLength / 2 + y)}
        x2={margin + scaledSize * scaledzLength / 2}
        y2={margin + scaledSize * y}
        key={`yz-y${scaledyLength - y}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />);
      elements_.push(<line
        x1={margin + scaledSize * scaledzLength / 2}
        y1={margin + scaledSize * y}
        x2={margin + scaledSize * (scaledzLength / 2 + scaledxLength)}
        y2={margin + scaledSize * y}
        key={`xy-y${scaledyLength - y}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />);
    }
    for (let z = 0; z <= scaledzLength; z++) {
      elements_.push(<line 
        x1={margin + z * scaledSize / 2} 
        y1={margin + scaledSize * (scaledzLength - z) / 2}
        x2={margin + z * scaledSize / 2} 
        y2={margin + scaledSize * ((scaledzLength - z) / 2 + scaledyLength)}
        key={`yz-z${scaledzLength - z}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />);
      elements_.push(<line 
        x1={margin + z * scaledSize / 2} 
        y1={margin + scaledSize * ((scaledzLength - z) / 2 + scaledyLength)}
        x2={margin + scaledSize * (z / 2 + scaledxLength)} 
        y2={margin + scaledSize * ((scaledzLength - z) / 2 + scaledyLength)}
        key={`xz-z${scaledzLength - z}`}
        stroke={rasterStroke}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
        />);
    }

    elements_.push(<line 
      x1={margin + scaledSize * scaledzLength / 2}
      y1={margin + scaledSize * scaledyLength}
      x2={margin + scaledSize * (scaledzLength / 2 + scaledxLength)}
      y2={margin + scaledSize * scaledyLength}
      key={`x-axis`}
      stroke={rasterStrokeAccent}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
    />)

    elements_.push(<line 
      x1={margin + scaledSize * scaledzLength / 2}
      y1={margin + scaledSize * scaledyLength}
      x2={margin + scaledSize * scaledzLength / 2}
      y2={margin}
      key={`y-axis`}
      stroke={rasterStrokeAccent}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
    />)
    
    elements_.push(<line 
      x1={margin + scaledSize * scaledzLength / 2}
      y1={margin + scaledSize * scaledyLength}
      x2={margin}
      y2={margin + scaledSize * (scaledyLength + scaledzLength / 2)}
      key={`z-axis`}
      stroke={rasterStrokeAccent}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
    />)
    
    let xyz_pointList = [[margin, margin + size * zLength / 2]];
    let xy_points = `${margin + size * zLength / 2},${margin} `;
    let xy_position = [margin + size * zLength / 2, margin];
    let xz_points = `${margin},${margin + size * (zLength / 2 + yLength)} `;
    let xz_position = [margin, margin + size * (zLength / 2 + yLength)];
    let yz_points = `${margin},${margin + size * zLength / 2} `;
    let yz_position = [margin, margin + size * zLength / 2];
    
    for (let i = 0; i < path.length; i++) {
      if (path[i] === 1) {
        xyz_pointList.push([xyz_pointList[i][0] + size * 1.5, xyz_pointList[i][1] + size / 2]);

        xy_points += `${xy_position[0] + size},${xy_position[1] + size} `;
        xy_position = [xy_position[0] + size, xy_position[1] + size];

        xz_points += `${xz_position[0] + size * 1.5},${xz_position[1] - size / 2} `;
        xz_position = [xz_position[0] + size * 1.5, xz_position[1] - size / 2];

        yz_points += `${yz_position[0] + size / 2},${yz_position[1] + size / 2} `;
        yz_position = [yz_position[0] + size / 2, yz_position[1] + size / 2];
        continue;
      }
      if (path[i] === 2) {
        xyz_pointList.push([xyz_pointList[i][0] + size, xyz_pointList[i][1] + size]);

        xy_points += `${xy_position[0] + size},${xy_position[1] + size} `;
        xy_position = [xy_position[0] + size, xy_position[1] + size];

        xz_points += `${xz_position[0] + size},${xz_position[1]} `;
        xz_position = [xz_position[0] + size, xz_position[1]];

        yz_points += `${yz_position[0]},${yz_position[1] + size} `;
        yz_position = [yz_position[0], yz_position[1] + size];
        continue;
      }
      if (path[i] === 3) {
        xyz_pointList.push([xyz_pointList[i][0] + size * 1.5, xyz_pointList[i][1] - size / 2]);

        xy_points += `${xy_position[0] + size},${xy_position[1]} `;
        xy_position = [xy_position[0] + size, xy_position[1]];

        xz_points += `${xz_position[0] + size * 1.5},${xz_position[1] - size / 2} `;
        xz_position = [xz_position[0] + size * 1.5, xz_position[1] - size / 2];

        yz_points += `${yz_position[0] + size / 2},${yz_position[1] - size / 2} `;
        yz_position = [yz_position[0] + size / 2, yz_position[1] - size / 2];
        continue;
      }
      if (path[i] === 4) {
        xyz_pointList.push([xyz_pointList[i][0] + size / 2, xyz_pointList[i][1] + size / 2]);

        xy_points += `${xy_position[0]},${xy_position[1] + size} `;
        xy_position = [xy_position[0], xy_position[1] + size];

        xz_points += `${xz_position[0] + size / 2},${xz_position[1] - size / 2} `;
        xz_position = [xz_position[0] + size / 2, xz_position[1] - size / 2];

        yz_points += `${yz_position[0] + size / 2},${yz_position[1] + size / 2} `;
        yz_position = [yz_position[0] + size / 2, yz_position[1] + size / 2];
        continue;
      }
      if (path[i] === 5) {
        xyz_pointList.push([xyz_pointList[i][0] + size, xyz_pointList[i][1] + 0.000005]);
    
        xy_points += `${xy_position[0] + size},${xy_position[1]} `;
        xy_position = [xy_position[0] + size, xy_position[1]];

        xz_points += `${xz_position[0] + size},${xz_position[1]} `;
        xz_position = [xz_position[0] + size, xz_position[1]];
        continue;
      }
      if (path[i] === 6) {
        xyz_pointList.push([xyz_pointList[i][0], xyz_pointList[i][1] + size]);

        xy_points += `${xy_position[0]},${xy_position[1] + size} `;
        xy_position = [xy_position[0], xy_position[1] + size];

        yz_points += `${yz_position[0]},${yz_position[1] + size} `;
        yz_position = [yz_position[0], yz_position[1] + size];
        continue;
      }
      xyz_pointList.push([xyz_pointList[i][0] + size / 2, xyz_pointList[i][1] - size / 2]);

      xz_points += `${xz_position[0] + size / 2},${xz_position[1] - size / 2} `;
      xz_position = [xz_position[0] + size / 2, xz_position[1] - size / 2];
      
      yz_points += `${yz_position[0] + size / 2},${yz_position[1] - size / 2} `;
      yz_position = [yz_position[0] + size / 2, yz_position[1] - size / 2];
    }
    
    elements_.push(<polyline
      points={xy_points}
      stroke={shadowStroke}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
      fill={'none'}
      key={'xy-path'}
    />);

    elements_.push(<polyline
      points={xz_points}
      stroke={shadowStroke}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
      fill={'none'}
      key={'xz-path'}
    />); 

    elements_.push(<polyline
      points={yz_points}
      stroke={shadowStroke}
      strokeWidth={strokeWidth}
      strokeLinecap={'round'}
      fill={'none'}
      key={'yz-path'}
    />);

    for (let i = 0; i < xyz_pointList.length - 1; i++) {
      elements_.push(<line
        x1={xyz_pointList[i][0]}
        y1={xyz_pointList[i][1]}
        x2={xyz_pointList[i + 1][0]}
        y2={xyz_pointList[i + 1][1]}
        key={`xyz-path-${i}`}
        stroke={`url(#gradient-${i})`}
        strokeWidth={strokeWidth}
        strokeLinecap={'round'}
      />)
    }

    const pathRanksText = pathRanks.map((r) => {return (`var(--rank-color-${r})`)}) // zu texte Formatieren

    let gradients_ = [];
    for (let i = 0; i < xyz_pointList.length - 1; i++) {
      gradients_.push(<linearGradient id={`gradient-${i}`} x1={xyz_pointList[i][0]} y1={xyz_pointList[i][1]} x2={xyz_pointList[i+1][0]} y2={xyz_pointList[i+1][1]} gradientUnits={'userSpaceOnUse'} key={`gradient-${i}`}>
        <stop offset={'0%'} stopColor={pathRanksText[i]}/>
        <stop offset={'100%'} stopColor={pathRanksText[i + 1]}/>
      </linearGradient>)
    }

    return [elements_, gradients_];
  }, [path, pathRanks, xLength, yLength, zLength, margin, size]);

  return (
    <Fragment >
      <svg
        className='raster' 
        viewBox={`0 0 ${2 * margin + size * (xLength + zLength / 2)} ${2 * margin + size * (yLength + zLength / 2)}`} 
        width='100%'
        height='100%'>
        <defs>
          { gradients }
        </defs>
        { elements }
      </svg>
      <svg
        className='scala'
        viewBox='0 0 10 100'
        preserveAspectRatio='none'
        width='10px'
        height='100%'>
        <defs>
          <linearGradient id="gradient-scala" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="var(--rank-color-10)" />
            <stop offset="10%" stopColor="var(--rank-color-9)" />
            <stop offset="20%" stopColor="var(--rank-color-8)" />
            <stop offset="30%" stopColor="var(--rank-color-7)" />
            <stop offset="40%" stopColor="var(--rank-color-6)" />
            <stop offset="50%" stopColor="var(--rank-color-5)" />
            <stop offset="60%" stopColor="var(--rank-color-4)" />
            <stop offset="70%" stopColor="var(--rank-color-3)" />
            <stop offset="80%" stopColor="var(--rank-color-2)" />
            <stop offset="90%" stopColor="var(--rank-color-1)" />
            <stop offset="100%" stopColor="var(--rank-color-0)" />
          </linearGradient>
        </defs>
        <rect width={10} height={'100%'} fill='url(#gradient-scala)'/>
      </svg>
    </Fragment>
  );
}

function Matrix(props) {
  const { seq1, seq2, seq3, path, pathRanks } = props;
  
  return (
    <div className='matrixContainer2' >
       <ThreeDimensionalRoom xLength={seq1.length} yLength={seq2.length} zLength={seq3.length} path={path} pathRanks={pathRanks}/>
    </div>
  )
}

export default React.memo(Matrix);