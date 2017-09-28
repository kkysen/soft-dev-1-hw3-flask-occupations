"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
function identity(t) {
    return t;
}
var TableSorter = (function () {
    function TableSorter(selector, startRow, endRow) {
        this.table = $(selector).find('tbody');
        this.rows = this.table.find('tr');
        this.startRow = startRow;
        if (endRow < 0) {
            endRow = this.rows.length - endRow;
        }
        this.endRow = endRow;
    }
    TableSorter.prototype.bindColumn = function (selector, key) {
        TableSorter.sortColumn(this.table, this.rows, selector, key, this.startRow, this.endRow);
    };
    TableSorter.sortColumn = function (_table, _rows, _selector, _key, _startRow, _endRow) {
        var table = _table;
        var rows = _rows;
        var selector = _selector;
        var key = _key;
        var startRow = _startRow;
        var endRow = _endRow;
        var parse = function (value) {
            return key($(value).children('td').eq(column).text());
        };
        var order = 1;
        var sort = function () {
            rows.slice(startRow, endRow).sort(function (e1, e2) {
                var t1 = parse(e1);
                var t2 = parse(e2);
                return t1 == t2 ? 0 : t1 < t2 ? -order : order;
            }).appendTo(table);
        };
        var columnHeader = $(selector);
        var column = $(columnHeader).prevAll().length;
        columnHeader.click(function () {
            sort();
            order *= -1;
        });
    };
    return TableSorter;
}());
var occupationsTable = new TableSorter('#occupations-table', 1, -1);
occupationsTable.bindColumn('#occupation-column', identity);
occupationsTable.bindColumn('#percent-column', function (i) { return parseInt(i.slice(0, i.length - 1), 10); });
