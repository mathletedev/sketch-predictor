const ROWS: number = 20;
const COLS: number = 20;
const SCALE: number = 0.9;

const canvas: HTMLCanvasElement = document.getElementById(
	"canvas"
)! as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
let grid: number[][] = [];
let boxSize: number;

for (let i: number = 0; i < ROWS; i++) grid.push(new Array(COLS).fill(0));

const resize = (): void => {
	boxSize = Math.round(
		Math.min(window.innerWidth / COLS, window.innerHeight / ROWS) * SCALE
	);
	canvas.width = COLS * boxSize;
	canvas.height = ROWS * boxSize;
};

resize();

const drawGrid = (): void => {
	for (let i: number = 0; i < ROWS; i++) {
		for (let j: number = 0; j < COLS; j++) {
			ctx.fillStyle = grid[i][j] === 0 ? "white" : "black";
			ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize);
		}
	}
};

canvas.addEventListener("mousedown", (e: MouseEvent): void => {
	const rect: DOMRect = canvas.getBoundingClientRect();
	const x: number = Math.floor((e.clientX - rect.left) / boxSize);
	const y: number = Math.floor((e.clientY - rect.top) / boxSize);
	grid[y][x] = grid[y][x] === 0 ? 1 : 0;
	drawGrid();
});

window.addEventListener("resize", (_: UIEvent) => {
	resize();
	drawGrid();
});
