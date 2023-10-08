import "../styles/main.css";
import { CommandInfo } from "./REPL.types";

interface REPLHistoryProps {
  isBrief: boolean;
  history: CommandInfo[];
}
export function REPLHistory({ isBrief, history }: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {history.map((commandInfo, index) => (
        <div key={index}>
          {commandInfo.isBrief ? (
            <p>{commandInfo.output}</p>
          ) : (
            <>
              <p>{"Command: " + commandInfo.command}</p>
              <p>{"Output: " + commandInfo.output}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
