/**
 * Triangle class
 * @param {CGFscene} scene
 * @param {int} x1
 * @param {int} y1
 * @param {int} z1
 * @param {int} x2
 * @param {int} y2
 * @param {int} z2
 * @param {int} x3
 * @param {int} y3
 * @param {int} z3
 */
function Triangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    CGFobject.call(this, scene);

    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;

    this.minS = 0;
    this.minT = 0;
    this.maxS = 1;
    this.maxT = 1;

    this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor = Triangle;

Triangle.prototype.initBuffers = function() {

    this.vertices = [
        this.x1, this.y1, this.z1,
        this.x2, this.y2, this.z2,
        this.x3, this.y3, this.z3
    ];

    this.indices = [
        0, 1, 2
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    var side1 = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) + Math.pow(this.z2 - this.z1, 2));
    var side2 = Math.sqrt(Math.pow(this.x2 - this.x3, 2) + Math.pow(this.y2 - this.y3, 2) + Math.pow(this.z2 - this.z3, 2));
    var side3 = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2) + Math.pow(this.z1 - this.z3, 2));
    var angle = Math.acos((Math.pow(side2, 2) + Math.pow(side1, 2) - Math.pow(side3, 2)) / (2 * side1 * side2));
    var textCord5 = (side1 - side2 * Math.cos(angle)) / side1;
    var textCord6 = side2 * Math.sin(angle) / side1;

    this.texCoords = [
        this.maxS, this.minT,
        this.minS, this.minT,
        textCord5, textCord6
    ];

    this.initialTexCoords = [];
    this.initialTexCoords = this.texCoords;



    this.initGLBuffers();
};

Triangle.prototype.updateTexCoords = function(length_s, length_t) {

    if (length_s != 1 || length_t != 1) {
        for (let i = 0; i < this.initialTexCoords.length; i += 2) {
            this.texCoords[i] = this.initialTexCoords[i] / length_s;
            this.texCoords[i + 1] = this.initialTexCoords[i + 1] / length_t;
        }
    }

    this.updateTexCoordsGLBuffers();
};
