/**
 * JOB: Listen for media query changes, and active or deactivate rules
 */
export default class CSSMediaQuery {
    /**
     *
     * @param {string} condition The media query as string ie:`(orientation: portrait) and screen`
     */
    constructor(condition: string);
    /**
     *
     * @private
     */
    private _condition;
    /**
     *
     * @type {Array.<CSSRuleVR>}
     * @private
     */
    private _rules;
    /**
     *
     * @type {MediaQueryList}
     * @private
     */
    private _matchMediaQuery;
    /**
     *
     * @param {CSSRuleVR} rule
     */
    addRule(rule: CSSRuleVR): void;
    /**
     *
     * @param callback
     */
    init(callback: any): void;
    _callback: any;
    /**
     *
     */
    enableRules(): void;
    /**
     *
     */
    disableRules(): void;
    /**
     *
     * @param {MediaQueryListEvent} e
     */
    handleMatchMediaChanges: (e: MediaQueryListEvent) => void;
}
