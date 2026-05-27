import svgPaths from "./svg-4w28avf366";

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-center min-h-px relative">
      <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="Icon Button">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="house 20 Medium">
          <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-4.11%_-4.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3 17.1329">
                <path d={svgPaths.p3667f580} id="Vector" stroke="var(--stroke-0, #6A757E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 1">
            <line id="Line 1" stroke="var(--stroke-0, #E9ECEF)" x2="24" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 1">
            <line id="Line 1" stroke="var(--stroke-0, #CED4DA)" x2="32" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="bg-[#495059] content-stretch flex flex-col items-center justify-center p-[10px] relative rounded-[4px] shrink-0 size-[32px]" data-name="Avatar Size - Square">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic opacity-75 relative shrink-0 text-[20px] text-white whitespace-nowrap">R</p>
      </div>
    </div>
  );
}

export default function MainMenu() {
  return (
    <div className="backdrop-blur-[15px] bg-white content-stretch flex flex-col gap-[24px] items-center px-[12px] py-[24px] relative size-full" data-name="Main Menu">
      <div aria-hidden="true" className="absolute border-[#eaecef] border-r border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]" data-name="Icon Button">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="panel-left 20 Medium">
          <div className="absolute inset-[12.5%]" data-name="Vector">
            <div className="absolute inset-[-4.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.3 16.3">
                <path d={svgPaths.p8ef8900} id="Vector" stroke="var(--stroke-0, #6A757E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame />
      <Frame1 />
    </div>
  );
}